const searchinputform = document.getElementById('searchinputform');
const input = document.getElementById('input');
const searchresults = document.getElementById('searchresults');
const searchbutton = document.getElementById('searchbutton');

searchbutton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('searchbutton');
    if(input.value != '') {
        window.location.href = "https://www.google.com/search?q=" + input.value;
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
            fetch('https://searchsuggestionapinodejs.herokuapp.com/suggest/' + encodeURIComponent(document.getElementById('input').value))
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
                window.location.href = "https://www.google.com/search?q=" + input.value; 
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
            