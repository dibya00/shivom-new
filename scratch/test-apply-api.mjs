import axios from 'axios';
import FormData from 'form-data';

async function testEndpoint(url, formHeaders, form) {
  console.log('\n----------------------------------------');
  console.log('Testing Endpoint:', url);
  try {
    const response = await axios.post(url, form, {
      headers: {
        ...formHeaders,
      },
    });
    console.log('Success! Status:', response.status);
    console.log('Response Body:', response.data);
    return true;
  } catch (error) {
    console.log('Failed! Status:', error.response?.status);
    console.log('Response Body:', error.response?.data);
    return false;
  }
}

async function run() {
  const division = 'group';
  const slug = 'business-development-manager';

  const endpoints = [
    `https://apishivom.visital.co.in/api/public/${division}/careers/${slug}/apply`,
    `https://apishivom.visital.co.in/api/public/${division}/careers/apply`,
    `https://apishivom.visital.co.in/api/public/careers/${slug}/apply`,
    `https://apishivom.visital.co.in/api/public/career-applications`,
    `https://apishivom.visital.co.in/api/public/careers/apply`
  ];

  for (const url of endpoints) {
    const form = new FormData();
    form.append('applicantName', 'Test Dev');
    form.append('email', 'testdev@gmail.com');
    form.append('phone', '8895865734');
    form.append('currentLocation', 'Bhubaneswar');
    form.append('experience', '3 Years');
    form.append('position', 'Business Development Manager');
    form.append('coverLetter', 'Cover letter content test.');
    form.append('division', division);
    form.append('resume', Buffer.from('PDF content mock'), {
      filename: 'resume.pdf',
      contentType: 'application/pdf',
    });

    await testEndpoint(url, form.getHeaders(), form);
  }
}

run();
