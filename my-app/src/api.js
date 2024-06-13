export const fetchData = async (name) => {
    try {
      const response = await fetch('http://localhost:8000/server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(name)}`
      });
      const data = await response.text();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };