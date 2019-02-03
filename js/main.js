;
(() => {
  'use strict'
  const btn = document.getElementById("add"); //нашол кнопку Добавить изображение
  let valueImage = document.getElementById('count'); //сколько картинок на екране
  const resultBlock = document.querySelector('#result');
  const changeSelect = document.getElementById('line-selector'); //для сортировки по именам А-Я, Я-А
  
  let visibleItem = []; //для добавления в него новых картинок для изображения на екране


  function fetchData(date) {
    return date.map(el => {
      return {
        url: transformURL(el.url),
        id: el.id,
        name: transformName(el.name),
        description: transformDescript(el.description),
        timeStamp: el.date, //для сортировки (єто время мы оставляем в миллисекундах)
        date: transformDate(el.date)
      }
    })
  }

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
  

  function renderGalleryByString(date) {
    
    let secondItemTemplate = '';
    
    date.forEach(item => {
      secondItemTemplate += `<div class="col-sm-3 col-sm-4 col-xs-6" text-center>
      <div class='thumbnail'>
        <img src="${item.url}" alt="${item.name}"></img>
          <div class='caption'>
          <h3>${item.id}: ${item.name}</h3>
          <p>${item.description}</p>
          <p>${item.date}</p>
          </div>
          <button class="btn btn-danger" class='del' data-id='${item.id}'>Удалить</button>
      </div>
   </div>`;
    });
    resultBlock.innerHTML = secondItemTemplate;
  }

  function deleteItemGallery(event) {
    if (!event.target.getAttribute('data-id')) {
      return;
    } 
    
    let indexDelItem = -1;
    let idValue = event.target.getAttribute('data-id');

    indexDelItem = visibleItem.indexOf(item.id = idValue); 
    preparedData = preparedData.concat(visibleItem.splice(indexDelTem, 1));
    sortGallery(visibleItem);
    visibleCount(visibleItem);
    renderGalleryByString(renderGalleryByString);
    changeStateBtn();
  }
/*
  function getCount(num) {
    valueImage.innerHTML = num.length;
  }*/

  /*function stopAddImg() {

  }*/

  function addImg() {
    if (visibleItem.length == data.length) {
      stopAddImg();
    } else {
      if (preparedData.length === 0) return;
      let elem = preparedData.pop();
      visibleItem.push(elem);
      ////
      sortGallery(visibleItem);
      visibleCount(visibleItem);
      renderGalleryByString(visibleItem);
      changeStateBtn();
    }
  }

  function sortGallery(visibleItem) {
    let key;
    let direction = 1;

    function sortMethod(a, b) {

      if (a[key] > b[key]) {
        return direction;
      } else if (a[key] < b[key]) {
        return -direction;
      } else {
        return 0
      }
    }

    switch (changeSelect.value) {
      case '0':
        key = 'name';
        direction = 1;
        return visibleItem.sort(sortMethod);
      case '1':
        key = 'name';
        direction = -1;
        return visibleItem.sort(sortMethod);
      case '2':
        key = 'timeStamp';
        direction = 1;
        return visibleItem.sort(sortMethod);
      case '3':
        key = 'timeStamp';
        direction = -1;
        return visibleItem.sort(sortMethod);
      default:
        alert('Выберете тип сортировки');
    }
  }

  function visibleCount(item) {
    valueImage.innerHTML = item.length;
  }

  function changeStateBtn() {
    if (visibleItem.length < data.length) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', '');
    }
  }

  /*function deleteImg(event){
    //if(!event.target.getAttribute('data-id')) return;

    let el = visibleItem.pop();
    preparedData.push(el);

  }*/

  function changeSortValue() { // 
    visibleItem = sortGallery(visibleItem);
    renderGalleryByString(visibleItem);
    sortValueToLocalStorage();
}
function sortValueToLocalStorage() {
  localStorage.setItem("myGoogle", changeSelect.value);
}
  
  
  //let preparedData;
  // const galleryBuild;
 
    let preparedData = fetchData(data);
    changeSelect.addEventListener('change', changeSortValue);
    resultBlock.addEventListener('click', deleteItemGallery);
    btn.addEventListener("click", addImg);

    //valueImage.addEventListener('click', renderGalleryByString(visibleItem));
    //getCount(preparedData);
})();