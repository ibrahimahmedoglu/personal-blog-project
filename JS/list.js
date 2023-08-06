let parameterValueIncome = ""
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the parameter from the URL

    const navigateBtn = document.getElementById("listBlogs");
    navigateBtn.addEventListener("click", function() {
      // Get the parameter you want to send to the other page (in this example, "parameterValue")
      const parameterValue = navigateBtn.getAttribute("name");
  
      // Navigate to the other page and send the parameter as a query parameter
      window.location.href = `../HTML/list.html?cat=${encodeURIComponent(parameterValue)}`;
      
    });
    const navigateBtnn = document.getElementById("listPodcasts");
    navigateBtnn.addEventListener("click", function() {
      // Get the parameter you want to send to the other page (in this example, "parameterValue")
      const parameterValue = navigateBtnn.getAttribute("name");
  
      // Navigate to the other page and send the parameter as a query parameter
      window.location.href = `../HTML/list.html?cat=${encodeURIComponent(parameterValue)}`;
      
    });


    const urlParams = new URLSearchParams(window.location.search);
    parameterValueIncome = urlParams.get('cat');
  
    if (parameterValueIncome == "Blogs") {
      const jsonFileBlog = 'http://localhost:4000/blogs';
      fetchDataFromJSONFile(jsonFileBlog)
        .then(data => {
          const blogsData = data;
          generateResponsiveLayout(blogsData);
        });
    } else if (parameterValueIncome == "Podcasts") {
      const jsonFilePodcasts = 'http://localhost:4000/podcasts';
      fetchDataFromJSONFile(jsonFilePodcasts)
        .then(data => {
          const podcastsData = data;
          generateResponsiveLayout(podcastsData);
        });
    }
  });
  

    
  
  function generateResponsiveLayout(arrayData) {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = ''; 
  
    const row = document.createElement('div');
    row.classList.add('row');
  
    arrayData.forEach((item) => {
      const column = document.createElement('div');
      column.classList.add('col-lg-4', 'col-md-6', 'col-sm-12','mb-5', 'card-button'); 
      column.setAttribute("itemID", item.id)
  
      // Create and add an image
      const image = document.createElement('img');
      image.src = "../Assets/" + item.cover_image;
      image.classList.add('img-fluid', 'm-3', 'p-2' ,'border','rounded'); 
      column.appendChild(image);
  
      // Create and add the title
      const title = document.createElement('h5');
      title.textContent = item.title;
      column.appendChild(title);
  
      // Create and add the paragraph
      const paragraph = document.createElement('p');
      paragraph.textContent = item.body;
      column.appendChild(paragraph);
  
      // Create and add the icon and number of likes
      const likesContainer = document.createElement('div');
      likesContainer.classList.add('d-flex', 'align-items-center');
  
      const likeIcon = document.createElement('i');
      likeIcon.classList.add('fas', 'fa-heart', 'mr-2'); // Assuming you're using Font Awesome icons
      likesContainer.appendChild(likeIcon);
  
      const likesCount = document.createElement('span');
      likesCount.textContent = item.likes;
      likesContainer.appendChild(likesCount);
  
      column.appendChild(likesContainer);
  
      row.appendChild(column);
    });
  
    contentContainer.appendChild(row);
    const navigateBtnnN = document.getElementsByClassName("card-button");
    for (let i = 0; i < navigateBtnnN.length; i++) {
      navigateBtnnN[i].addEventListener("click", function() {
        // Get the parameter you want to send to the other page (in this example, "parameterValue")
        const parameterValue = this.getAttribute("itemID");
  
        // Navigate to the other page and send the parameter as a query parameter
        window.location.href = `detail.html?id=${encodeURIComponent(parameterValue)}&cat=${encodeURIComponent(parameterValueIncome)}`;
      });
    }
  }
  
  

  function fetchDataFromJSONFile(jsonFileUrl) {
    return fetch(jsonFileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
