;
(() => {
  'use strict'

  const btn = document.getElementById("add"); //нашол кнопку Добавить изображение
  let valueImage = document.getElementById('count'); //сколько картинок на екране
  const resultBlock = document.querySelector('#result');



  /*function sliceData(preparedData) {
    switch (amountImage.value) {
      case '0':
        return preparedData.slice(0);
      case '1':
        return preparedData.slice(0, 3);
      case '2':
        return preparedData.slice(0, 6);
    }
  }
  */

  function fetchData() {
    let newData = [];
    data.forEach(el => {
      newData.push({
        url: transformURL(el.url),
        id: el.id,
        name: transformName(el.name),
        description: transformDescript(el.description),
        date: transformDate(el.date)
      })
    })
    return newData;

    function transformURL(url) {
      return (url.substr(0, 6) == 'http://') ?
        url :
        'http://' + url;
    }

    function transformName(name) {
      return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
    }

    function transformDescript(text) {
      return (text.length > 15) ?
        text.substr(0, 15) + '...' :
        text;
    }

    function transformDate(milliseconds) {
      return moment(milliseconds).format('YYYY/MM/DD HH:mm');
    }
  }

  function renderGalleryByString(date) {
    let secondItemTemplate = '';
    date.forEach(item => {
      secondItemTemplate = `<div class="col-sm-3 col-sm-4 col-xs-6" text-center>
      <div class='thumbnail'>
        <img src="${item.url}" alt="${item.name}"></img>
          <div class='caption'>
          <h3>${item.id}: ${item.name}</h3>
          <p>${item.description}</p>
          <p>${item.date}</p>
          </div>
          <button class="btn btn-danger" onclick="removeElement(event)">Удалить</button>
      </div>
   </div>`;
  
    })
    resultBlock.innerHTML = secondItemTemplate;
  }



  /*let dataCopy = data.slice();
  if(count == '1') {
    dataCopy = dataCopy.splice(0, 3)
  } else if (count == '2') {
    dataCopy = dataCopy.splice(0,)
  }
  */






 function lengthDisplayGallery(num) {
  if (num.length > 10) {
    alert('foo');
    resultBlock.classList.add('hide');
  } else {
    valueImage.innerHTML += num.length;
    
  }
 }
 




  function run() {
    const preparedData = fetchData();
    const galleryBuild = renderGalleryByString(preparedData);
    valueImage.addEventListener('click', galleryBuild); 
    lengthDisplayGallery(preparedData);
  }

  btn.addEventListener("click", run);
})();