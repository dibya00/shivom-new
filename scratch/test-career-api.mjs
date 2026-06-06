import axios from 'axios';
import FormData from 'form-data';

async function testApi() {
  const url = 'https://apishivom.visital.co.in/api/public/group/career-applications';
  console.log('Testing URL:', url);

  const form = new FormData();
  form.append('fullName', 'Test Applicant');
  form.append('email', 'test@example.com');
  form.append('phone', '9999999999');
  form.append('currentLocation', 'Bhubaneswar');
  form.append('experience', '2 Years');
  form.append('position', 'Software Developer');
  form.append('careerId', '65842c9da8b63a3d240dcd21'); // Mock or real ObjectID
  form.append('coverLetter', 'This is a test application.');
  
  // Let's append a dummy resume text file to simulate file upload
  form.append('resume', Buffer.from('PDF dummy content'), {
    filename: 'resume.pdf',
    contentType: 'application/pdf',
  });

  try {
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log('Response Status:', response.status);
    console.log('Response Body:', response.data);
  } catch (error) {
    console.error('Error Status:', error.response?.status);
    console.error('Error Body:', error.response?.data);
  }
}

testApi();
