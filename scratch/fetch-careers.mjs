import axios from 'axios';

async function fetchCareers() {
  const url = 'https://apishivom.visital.co.in/api/public/group/careers';
  try {
    const response = await axios.get(url);
    console.log('Group Careers:', response.data?.data?.map(c => ({ id: c._id, title: c.title, slug: c.slug, division: c.division })));
  } catch (err) {
    console.error('Error fetching group careers:', err.message);
  }

  const solarUrl = 'https://apishivom.visital.co.in/api/public/solar/careers';
  try {
    const response = await axios.get(solarUrl);
    console.log('Solar Careers:', response.data?.data?.map(c => ({ id: c._id, title: c.title, slug: c.slug, division: c.division })));
  } catch (err) {
    console.error('Error fetching solar careers:', err.message);
  }
}

fetchCareers();
