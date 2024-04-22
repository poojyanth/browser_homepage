const searchinputform = document.getElementById('searchinputform');
const input = document.getElementById('input');
const searchresults = document.getElementById('searchresults');
const searchbutton = document.getElementById('searchbutton');

document.addEventListener("DOMContentLoaded", function() {
  // Focus on the input field when the page loads
  document.getElementById("input").focus();

  // Submit the form when Enter key is pressed
  document.getElementById("input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      var text = input.value.trim();
      if (text !== "") {
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(text);
      }
    }
  });
});



searchbutton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('searchbutton');
    if(input.value != '') {
        var text = input.value;
        input.value = '';
        window.location.href = "https://www.google.com/search?q=" + text;
    }
});

if(input.value === '') {
    searchresults.style.display = 'none';  
}
else {
    searchresults.style.display = 'block';
}

document.getElementById('input').addEventListener('input',suggest);        
        function suggest(){
            console.log(document.getElementById('input').value);
            fetch('https://searchsuggestionsapi.onrender.com/suggest/' + encodeURIComponent(document.getElementById('input').value))
            .then(response => response.json())
            .then(data => {
            console.log(data);
            let html = ' ';
            data.forEach(element => {
                html += '<option value="'+element+'"><a href="https://www.google.com/search?q=' +element + '">' + element + '</a></option>';                    
            });
            html += ' ';

            document.getElementById('searchresults').innerHTML = html;
            })
            .catch(error => console.error(error));
            //         fetch('https://searchsuggestionapinodejs.herokuapp.com/suggest/' + encodeURIComponent(document.getElementById('query').value), {method: 'GET'})
            // .then(response => response.json())
            // .then(data => {
            //     console.log(data);

            //     let html = '<ul id="suggestions">';
            //     data.forEach(element => {
            //         html += '<option><a href="https://www.google.com/search?q=' +element + '">' + element + '</a></option>';                    
            //     });
            //     html += '</ul>';

            //     document.getElementById('results').innerHTML = html;

            // })
            // .catch(error => console.error(error));
            }

                    
            input.onfocus = function () {
                console.log('focus');            
            input.style.borderRadius = "5px 5px 0 0";  
            
            };

            // input.onblur = function () {
            //     console.log('blur input');         
            //     searchresults.style.display = 'none';     
            // input.style.borderRadius = "5px";
            
            // };

            searchresults.addEventListener('click', function(e) {
                input.value = e.target.value;
                searchresults.style.display = 'none';
                input.style.borderRadius = "5px";
                console.log('click');
                var text = input.value;
                input.value = '';
                window.location.href = "https://www.google.com/search?q=" + text; 
            });



            for (let option of searchresults.options) {
                console.log('option');
            option.onclick = function () {
                console.log('click'+option.value);
                input.value = option.value;
                searchresults.style.display = 'none';
                input.style.borderRadius = "5px";
            }
            };

            searchinputform.onblur = function () {
                console.log('blur');
            searchresults.style.display = 'none';
            input.style.borderRadius = "5px";
            };

            input.oninput = function() {
                searchresults.style.display = 'block';
            currentFocus = -1;
            var text = input.value.toUpperCase();
            for (let option of searchresults.options) {
                if(option.value.toUpperCase().indexOf(text) > -1){
                option.style.display = "block";
            }else{
                option.style.display = "none";
                }
            };
            }

            var currentFocus = -1;
            input.onkeydown = function(e) {
                console.log(e.keyCode+'keydown');
            if(e.keyCode == 40){
                currentFocus++
            addActive(searchresults.options);
            }
            else if(e.keyCode == 38){
                currentFocus--
            addActive(searchresults.options);
            }
            else if(e.keyCode == 13){

                e.preventDefault();
                    if (currentFocus > -1) {
                    {
                        searchresults.style.display = 'none';
                        input.style.borderRadius = "5px";
                        input.value = searchresults.options[currentFocus].value;
                        window.location.href = "https://www.google.com/search?q=" + input.value;
                    }
                    if (searchresults.options) searchresults.options[currentFocus].click();
                    }
            }
            }  

            function addActive(x) {
                if (!x) return false;
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                x[currentFocus].classList.add("active");
              }
              function removeActive(x) {
                for (var i = 0; i < x.length; i++) {
                  x[i].classList.remove("active");
                }
              }

            //   var currentTimeElement = document.getElementById('time');
            //   var currentTime = new Date();
            //   currentTimeElement.textContent = currentTime.toLocaleTimeString();
              
                      
            var clock = document.getElementById('clock');
            var time = clock.querySelector('.time');
            var date = clock.querySelector('.date');
            var text = clock.querySelector('.text');
            
            var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            var timerID = setInterval(updateTime, 1000);
            updateTime();
            
            function updateTime() {
                var cd = new Date();
                time.textContent = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
                date.textContent = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
            };
            
            function zeroPadding(num, digit) {
                var zero = '';
                for(var i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            }
            

            // // add book mark            
            // var rightpane = document.getElementById('rightpane');
            // var bookmar = (localStorage.getItem('bookmarks'));
            // if(!bookmar) {
            //     var bookmarks = [
            //         {
            //             address: 'https://www.google.com',
            //             title: 'Google'
            //         }
            //     ];
            //     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            // }
            // var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "") || [''];
            // bookmarks.forEach(function(bookmark) {
            //     var div = document.createElement('div');
            //     div.className = 'bookmark';
            //     div.innerHTML ='<a class="bookmark-link" href="' + bookmark.address + '" target="_blank"><div class="bookmark-icon-container"><img class="bookmark-icon" width="50px" src="https://www.google.com/s2/favicons?domain='+bookmark.address+'&sz=256" alt=""></div><p class="bookmark-name">' + bookmark.title + '</p></a>';
            //     rightpane.appendChild(div);
            // });
            // rightpane.innerHTML += '<div id="add-bookmark" class="bookmark"><a class="bookmark-link add-bookmark" id="add-bookmark"><div class="bookmark-icon-container"><i class="fas fa-plus"></i></div><p class="bookmark-name">Add</p></a></div>';
            // var addbookmark = document.getElementById('add-bookmark');
            // addbookmark.addEventListener('click', function(e) {        
            //     console.log('click');
            //     var address = prompt("Please enter the address of the bookmark", "https://www.google.com");
            //     var title = prompt("Please enter the title of the bookmark", "Google");
            //     console.log(address);
            //     console.log(title);
            //     var bookmark1 = {
            //         address: address,
            //         title: title
            //     }
            //     var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "") || [''];
            //     console.log(bookmarks);
            //     if(bookmark1.address != null && bookmark1.title != null)
            //     bookmarks.push(bookmark1);
            //     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            //     console.log(bookmark1);
            //     rightpane.innerHTML = '';
            //     bookmarks.forEach(function(bookmark) {
            //         var div = document.createElement('div');
            //         div.className = 'bookmark';
            //         div.innerHTML ='<a class="bookmark-link" href="' + bookmark.address + '" target="_blank"><div class="bookmark-icon-container"><img class="bookmark-icon" width="50px" src="https://www.google.com/s2/favicons?domain='+bookmark.address+'&sz=256" alt=""></div><p class="bookmark-name">' + bookmark.title + '</p></a>';
            //         rightpane.appendChild(div);
            //     }
            //     );
            //     rightpane.innerHTML += '<div class="bookmark"><a class="bookmark-link add-bookmark" id="add-bookmark"><div class="bookmark-icon-container"><i class="fas fa-plus"></i></div><p class="bookmark-name">Add</p></a></div>';
            // });
                

            var rightpane = document.getElementById('rightpane');
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
            
            function renderBookmarks() {
              // clear the rightpane first
              rightpane.innerHTML = '';
            
              // check if there are no bookmarks stored
              if (bookmarks.length === 0) {
                bookmarks.push({
                    address: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
                    title: 'Youtube'
                });
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
              }                 // render each bookmark
                bookmarks.forEach(function(bookmark, index) {
                  var div = document.createElement('div');
                  div.className = 'bookmark';
                  div.innerHTML = `
                    <a class="bookmark-link" href="${bookmark.address}" >
                      <div class="bookmark-icon-container">
                        <img class="bookmark-icon" width="50px" src="https://www.google.com/s2/favicons?domain=${bookmark.address}&sz=256" alt="">
                      </div>
                      <p class="bookmark-name">${bookmark.title}</p>
                    </a>
                    <button class="delete-bookmark" data-index="${index}"><i class="fa-solid fa-trash" style="color: #ee3a3a;"></i></button>
                  `;
                  rightpane.appendChild(div);
                });
            
            
              // add the "Add Bookmark" button at the end
              var addbookmark = document.createElement('div');
              addbookmark.className = 'bookmark';
              addbookmark.innerHTML = `
                <a class="bookmark-link add-bookmark" id="add-bookmark">
                  <div class="bookmark-icon-container">
                    <i class="fas fa-plus"></i>
                  </div>
                  <p class="bookmark-name">Add</p>
                </a>
              `;
              rightpane.appendChild(addbookmark);
            
              // add event listener for the "Add Bookmark" button
              addbookmark.addEventListener('click', function(e) {
                var address = prompt("Please enter the address of the bookmark", "https://www.google.com");
                var title = prompt("Please enter the title of the bookmark", "Google");
                if (address && title) {
                  var bookmark = {
                    address: address,
                    title: title
                  };
                  bookmarks.push(bookmark);
                  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                  renderBookmarks();
                }
              });
            
              // add event listener for the "Delete" buttons
              var deleteButtons = document.querySelectorAll('.delete-bookmark');
              deleteButtons.forEach(function(button) {
                button.addEventListener('click', function(e) {
                  var index = parseInt(button.dataset.index);
                  bookmarks.splice(index, 1);
                  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                  renderBookmarks();
                });
              });
            }
            
            // render the bookmarks on page load
            renderBookmarks();
            


            //Background 
            const bgnumber = document.querySelectorAll('.image-holder').length;
            const changebackground = document.getElementById('bgchange');
            changebackground.addEventListener('click', function(e) {

              localStorage.setItem('background', (Number(localStorage.getItem('background'))+1)%bgnumber);
              renderBackground();
            });

            // Background Change
            function renderBackground() {
              console.log('rendering background');
              const background = localStorage.getItem('background') || "1";
              console.log(background);
              if(background == ''){
                background=1;
                localStorage.setItem('background', background);
              }
              document.querySelectorAll('.image-holder').forEach(function(image) {
                image.style.display = 'none';
              });
              document.getElementById('b'+background).style.display = 'block';
            }

            renderBackground();
