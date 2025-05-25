// Standalone authentication and profile management server
// This is completely independent from your main project to avoid dependency issues
const http = require('http');
const { MongoClient, ObjectId } = require('mongodb');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// MongoDB connection details
const uri = 'mongodb+srv://lahirudilhara08:XnW0YeE1zXArVoIb@lahirudb01.7jymymn.mongodb.net/?retryWrites=true&w=majority&appName=LahiruDB01';
const client = new MongoClient(uri);
const PORT = 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Simple multipart form data parser
function parseMultipartFormData(req, boundary, callback) {
  let body = '';
  let files = {};
  let fields = {};
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    // Parse the multipart form data
    const parts = body.split('--' + boundary);
    parts.forEach(part => {
      if (part.includes('Content-Disposition: form-data')) {
        const nameMatch = part.match(/name="([^"]*)"/i);
        if (nameMatch && nameMatch[1]) {
          const name = nameMatch[1];
          
          // Check if this is a file
          const filenameMatch = part.match(/filename="([^"]*)"/i);
          if (filenameMatch && filenameMatch[1]) {
            // It's a file
            const filename = filenameMatch[1];
            const contentTypeMatch = part.match(/Content-Type: ([^\r\n]*)/i);
            const contentType = contentTypeMatch ? contentTypeMatch[1] : '';
            
            // Get file content (everything after the double newline)
            const fileContent = part.split('\r\n\r\n')[1];
            if (fileContent) {
              // Create a buffer from the file content
              const buffer = Buffer.from(fileContent, 'binary');
              files[name] = {
                filename,
                contentType,
                buffer
              };
            }
          } else {
            // It's a regular field
            const fieldValue = part.split('\r\n\r\n')[1];
            if (fieldValue) {
              fields[name] = fieldValue.trim();
            }
          }
        }
      }
    });
    
    callback(fields, files);
  });
}

// Connect to MongoDB and start server
async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('portfolio');
    const usersCollection = db.collection('users');
    const profilesCollection = db.collection('profiles');
    const photosCollection = db.collection('photos'); // New collection for photos
    
    // Create admin user if not exists
    const adminExists = await usersCollection.findOne({ email: 'admin@example.com' });
    let adminId;
    
    if (!adminExists) {
      const result = await usersCollection.insertOne({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      adminId = result.insertedId;
      console.log('Admin user created');
    } else {
      // Update admin password for testing
      await usersCollection.updateOne(
        { email: 'admin@example.com' },
        { $set: { password: 'admin123' } }
      );
      adminId = adminExists._id;
      console.log('Admin password updated');
    }
    
    // Check if profile exists for admin, create if not
    const profileExists = await profilesCollection.findOne({ userId: adminId });
    if (!profileExists) {
      await profilesCollection.insertOne({
        userId: adminId,
        fullName: 'Admin User',
        professionalTitle: 'Full Stack Developer',
        bio: 'Passionate web developer with expertise in MERN stack',
        location: 'San Francisco, CA',
        email: 'admin@example.com',
        phone: '+1 (555) 123-4567',
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername',
        photoId: null, // New field to reference photos collection
        profilePicture: '', // Keep for backward compatibility
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Default admin profile created');
    }
    
    // Create HTTP server
    const server = http.createServer(async (req, res) => {
      // Set CORS headers for all responses
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      // Handle preflight OPTIONS request
      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }
      
      // Parse URL
      const parsedUrl = url.parse(req.url);
      
      // Serve static files from uploads directory
      if (parsedUrl.pathname.startsWith('/uploads/') && req.method === 'GET') {
        const filePath = path.join(__dirname, parsedUrl.pathname);
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
          }
          
          // Determine content type based on file extension
          const ext = path.extname(filePath);
          let contentType = 'application/octet-stream';
          if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
          if (ext === '.png') contentType = 'image/png';
          if (ext === '.gif') contentType = 'image/gif';
          
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        });
        return;
      }
      
      // Basic health check
      if (parsedUrl.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Auth server is running' }));
        return;
      }
      
      // Public endpoint for homepage data
      if (parsedUrl.pathname === '/api/homepage' && req.method === 'GET') {
        try {
          // Get admin user
          const admin = await usersCollection.findOne({ role: 'admin' });
          if (!admin) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Profile not found' }));
            return;
          }
          
          // Get profile for admin user
          const profile = await profilesCollection.findOne({ userId: admin._id });
          
          if (!profile) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Profile not found' }));
            return;
          }
          
          // Get photo if available
          let photoUrl = '';
          if (profile.photoId) {
            const photo = await photosCollection.findOne({ _id: profile.photoId });
            if (photo) {
              photoUrl = photo.filePath;
            }
          } else if (profile.profilePicture) {
            // For backward compatibility
            photoUrl = `/uploads/${profile.profilePicture}`;
          }
          
          // Format the homepage data
          const homepageData = {
            fullName: profile.fullName || 'Your Name',
            professionalTitle: profile.professionalTitle || 'Full Stack Developer',
            bio: profile.bio || 'I create modern and responsive web applications with cutting-edge technologies.',
            location: profile.location || 'San Francisco, CA',
            email: profile.email || 'admin@example.com',
            phone: profile.phone || '',
            github: profile.github || 'https://github.com/yourusername',
            linkedin: profile.linkedin || 'https://linkedin.com/in/yourusername',
            twitter: profile.twitter || 'https://twitter.com/yourusername',
            profilePicture: photoUrl,
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS']
          };
          
          // Set CORS headers for public access
          res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
          
          res.end(JSON.stringify({ success: true, data: homepageData }));
        } catch (error) {
          console.error('Error getting homepage data:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Server error' }));
        }
        return;
      }
      
      // Handle login endpoint
      if (parsedUrl.pathname === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        
        // Collect request body data
        req.on('data', chunk => {
          body += chunk.toString();
        });
        
        // Process login when request is complete
        req.on('end', async () => {
          try {
            const credentials = JSON.parse(body);
            console.log('Login attempt:', credentials.email);
            
            // Find user in database
            const user = await usersCollection.findOne({ email: credentials.email });
            
            if (!user) {
              console.log('User not found');
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Invalid credentials' }));
              return;
            }
            
            // Check password (simple comparison for testing)
            if (user.password !== credentials.password) {
              console.log('Password mismatch');
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Invalid credentials' }));
              return;
            }
            
            // Success - generate a simple token (just for testing)
            const token = Buffer.from(user._id.toString() + Date.now().toString()).toString('base64');
            
            console.log('Login successful');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email
              }
            }));
          } catch (error) {
            console.error('Login error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Server error' }));
          }
        });
        
        return;
      }
      
      // Get user profile
      if (parsedUrl.pathname === '/api/admin/profile' && req.method === 'GET') {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Unauthorized' }));
          return;
        }
        
        try {
          // For simplicity, we're not validating the token properly
          // In a real app, you'd decode and verify the JWT token
          
          // Get admin user
          const admin = await usersCollection.findOne({ role: 'admin' });
          if (!admin) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Admin not found' }));
            return;
          }
          
          // Get profile for admin user
          const profile = await profilesCollection.findOne({ userId: admin._id });
          
          if (!profile) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Profile not found' }));
            return;
          }
          
          // Get photo if available
          let photoUrl = '';
          if (profile.photoId) {
            const photo = await photosCollection.findOne({ _id: profile.photoId });
            if (photo) {
              photoUrl = photo.filePath;
            }
          } else if (profile.profilePicture) {
            // For backward compatibility
            photoUrl = `/uploads/${profile.profilePicture}`;
          }
          
          // Format the profile data
          const formattedProfile = {
            fullName: profile.fullName || '',
            professionalTitle: profile.professionalTitle || '',
            bio: profile.bio || '',
            location: profile.location || '',
            email: profile.email || '',
            phone: profile.phone || '',
            github: profile.github || '',
            linkedin: profile.linkedin || '',
            twitter: profile.twitter || '',
            profilePicture: photoUrl
          };
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, profile: formattedProfile }));
        } catch (error) {
          console.error('Error getting profile:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Server error' }));
        }
        return;
      }
      
      // Update user profile
      if (parsedUrl.pathname === '/api/admin/profile' && req.method === 'PUT') {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Unauthorized' }));
          return;
        }
        
        // Check if this is a multipart form data request
        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('multipart/form-data')) {
          // Get the boundary
          const boundary = contentType.split('boundary=')[1];
          
          // Parse the multipart form data
          parseMultipartFormData(req, boundary, async (fields, files) => {
            try {
              // Get admin user
              const admin = await usersCollection.findOne({ role: 'admin' });
              if (!admin) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Admin not found' }));
                return;
              }
              
              // Prepare profile update data
              const updateData = {
                fullName: fields.fullName,
                professionalTitle: fields.professionalTitle,
                bio: fields.bio,
                location: fields.location,
                email: fields.email,
                phone: fields.phone,
                github: fields.github,
                linkedin: fields.linkedin,
                twitter: fields.twitter,
                updatedAt: new Date()
              };
              
              // Handle profile picture upload if present
              if (files.profilePicture && files.profilePicture.buffer) {
                const fileExt = path.extname(files.profilePicture.filename);
                const fileName = `profile_${admin._id}_${Date.now()}${fileExt}`;
                const filePath = path.join(uploadsDir, fileName);
                
                // Write file to disk
                fs.writeFileSync(filePath, files.profilePicture.buffer);
                
                // Create or update photo document in photos collection
                const photoDoc = {
                  userId: admin._id,
                  fileName: fileName,
                  filePath: `/uploads/${fileName}`,
                  contentType: files.profilePicture.contentType,
                  uploadDate: new Date(),
                  type: 'profile'
                };
                
                // Remove old photo record if exists
                await photosCollection.deleteMany({ userId: admin._id, type: 'profile' });
                
                // Insert the new photo record
                const photoResult = await photosCollection.insertOne(photoDoc);
                
                // Update profile with reference to photo document
                updateData.photoId = photoResult.insertedId;
                // Remove direct profilePicture field from profiles collection
                updateData.profilePicture = null;
              }
              
              // Update profile in database
              await profilesCollection.updateOne(
                { userId: admin._id },
                { $set: updateData },
                { upsert: true }
              );
              
              res.writeHead(200, { 'Content-Type': 'application/json' });
              // Always get the latest photo from photos collection
              let photoUrl = '';
              const latestPhoto = await photosCollection.findOne(
                { userId: admin._id, type: 'profile' },
                { sort: { uploadDate: -1 } }
              );
              
              if (latestPhoto) {
                photoUrl = latestPhoto.filePath;
                
                // Make sure the profile references this photo
                if (!updateData.photoId || !updateData.photoId.equals(latestPhoto._id)) {
                  updateData.photoId = latestPhoto._id;
                  updateData.profilePicture = null;
                  
                  // Update the profile again to ensure consistency
                  await profilesCollection.updateOne(
                    { userId: admin._id },
                    { $set: { photoId: latestPhoto._id, profilePicture: null } }
                  );
                }
              } else if (updateData.profilePicture) {
                // Only use old method if no photos in new collection
                photoUrl = `/uploads/${updateData.profilePicture}`;
              }
              
              res.end(JSON.stringify({ 
                success: true, 
                message: 'Profile updated successfully',
                profile: {
                  ...updateData,
                  profilePicture: photoUrl
                }
              }));
            } catch (error) {
              console.error('Error updating profile:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Server error' }));
            }
          });
          return;
        } else {
          // Handle regular JSON request
          let body = '';
          
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          req.on('end', async () => {
            try {
              const profileData = JSON.parse(body);
              
              // Get admin user
              const admin = await usersCollection.findOne({ role: 'admin' });
              if (!admin) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Admin not found' }));
                return;
              }
              
              // Update profile in database
              const updateData = {
                fullName: profileData.fullName,
                professionalTitle: profileData.professionalTitle,
                bio: profileData.bio,
                location: profileData.location,
                email: profileData.email,
                phone: profileData.phone,
                github: profileData.github,
                linkedin: profileData.linkedin,
                twitter: profileData.twitter,
                updatedAt: new Date()
              };
              
              await profilesCollection.updateOne(
                { userId: admin._id },
                { $set: updateData },
                { upsert: true }
              );
              
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                success: true, 
                message: 'Profile updated successfully',
                profile: updateData
              }));
            } catch (error) {
              console.error('Error updating profile:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Server error' }));
            }
          });
          return;
        }
      }
      
      // Not found for any other routes
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Not found' }));
    });
    
    // Start server
    server.listen(PORT, () => {
      console.log(`Standalone Auth Server running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('Server startup error:', error);
  }
}

// Start everything
startServer();
