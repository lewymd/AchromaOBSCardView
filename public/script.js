document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search');
  const nameList = document.getElementById('nameList');

  // Data representing the names and filenames
  let data = [];

  function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
  
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
  
      if (values.length === headers.length) {
        const item = {};
        for (let j = 0; j < headers.length; j++) {
          const header = headers[j].trim();
          const value = values[j].trim();
          item[header] = value;
          console.log(`Header: ${header}, Value: ${value}`); 
        }
        console.log('Card image URL:', item['cardimageurl']); 
        data.push(item);
      }
    }
  }
  

  // Function to load CSV data
  function loadCSV() {
    fetch('data.csv') 
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('CSV file not found');
        }
      })
      .then(csvData => {
        parseCSV(csvData);
        generateListItems();
      })
      .catch(error => {
        console.error('Error loading CSV:', error);
      });
  }

  // Function to remove punctuation from a string
  function removePunctuation(str) {
    return str.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
  }

  // Function to generate list items
  function generateListItems() {
    const searchTerm = removePunctuation(searchInput.value.toLowerCase());

    // Clear previous list items
    nameList.innerHTML = '';

    // Filter the data based on the search term
    const filteredData = data.filter(item => {
      const itemName = removePunctuation(item.name.toLowerCase());
      return itemName.includes(searchTerm);
    });

    // Sort the filtered data alphabetically by name
    const sortedData = filteredData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Create list items for the sorted data
    sortedData.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item.name;

      // Add click event listener to change the image and clear the input
      listItem.addEventListener('click', function() {
        changeImage(item.filename);
        searchInput.value = '';
        generateListItems(); // Refresh the list after clearing input
      });

      nameList.appendChild(listItem);
    });
  }

  // Function to change the image
  function changeImage(filename) {
    // Make a GET request to change the image using the filename
    fetch(`/image/${filename}`, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          console.log(`Image changed to: ${filename}`);
        } else {
          console.error(`Failed to change image to: ${filename}`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Add keydown event listener to the search input
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission

      const searchTerm = removePunctuation(searchInput.value.toLowerCase());

      // Filter the data based on the search term
      const filteredData = data.filter(item => {
        const itemName = removePunctuation(item.name.toLowerCase());
        return itemName.includes(searchTerm);
      });

      // Select the top result if there is one, or the first result if there are multiple
      if (filteredData.length > 0) {
        const topResult = filteredData[0];
        changeImage(topResult.filename);
        searchInput.value = '';
        generateListItems();
      }
    }
  });

  // Add input event listener to dynamically filter the list
  searchInput.addEventListener('input', generateListItems);

  // Load the CSV data and generate the initial list items
  loadCSV();
});
