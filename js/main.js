;
(() => {
  'use strict'

  const btn = document.getElementById("play");

  const typeMethod = document.getElementById("type-selector"), //выбранний метод selectBox
    amountImage = document.getElementById("line-selector"); //количество картинок    

  const firstBlock = document.querySelector('#first-line'), // для вывода информации в данный блок
    secondBlock = document.querySelector('#second-line'),
    thirdBlock = document.querySelector('#third-line');

  const firstGroupe = document.querySelector('#first-group'),
    secondGroupe = document.querySelector('#second-group'),
    thirdGroupe = document.querySelector('#third-group');

  function sliceData(preparedData) {
    switch (amountImage.value) {
      case '0':
        return preparedData.slice(0);
      case '1':
        return preparedData.slice(0, 3);
      case '2':
        return preparedData.slice(0, 6);
    }
  }

  function fetchData() {
    let newData = [];
    data.forEach(el => {
      newData.push({
        url: transformURL(el.url),
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
      return (text.length > 15) 
      ? text.substr(0, 15) + '...' 
      : text;
    }

    function transformDate(milliseconds) {
      return moment(milliseconds).format('YYYY/MM/DD HH:mm');
    }
  }

  function renderGalleryByReplace(date) {
    let resultHTML = ''; // для накопления результата 
    const replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
    <img src="$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
        <div class="text-muted">$name</div>\
        <div class="text-muted top-padding">$description</div>\
        <div class="text-muted">$date</div>\
    </div>\
    </div>';

    date.forEach(item => {
      resultHTML += replaceItemTemplate // += прошлись по масиву даннх и записали результат в resultHTML и так каждій раз. В resultHTML накапливаем результт
        .replace(/\$name/gi, item.name)
        .replace("$url", item.url)
        .replace("$description", item.description)
        .replace("$date", item.date);
    })

    firstBlock.innerHTML = resultHTML; //вывод результата
  }

  function renderGalleryByString(date) {
    let secondItemTemplate = '';
      date.forEach(item => {
        secondItemTemplate += `<div class="col-sm-3 col-xs-6">
        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">
        <div class="info-wrapper">
            <div class="text-muted">${item.name}</div>
            <div class="text-muted top-padding">${item.description}</div>
            <div class="text-muted">${item.date}</div>
        </div>
        </div>`;
      })
      secondBlock.innerHTML = secondItemTemplate;
  }

  function renderByCreateElement(date) {
    /*let dataCopy = data.slice();
    if(count == '1') {
      dataCopy = dataCopy.splice(0, 3)
    } else if (count == '2') {
      dataCopy = dataCopy.splice(0,)
    }
    */

      date.forEach(item => {
      let  divCol = document.createElement('div');
      divCol.classList.add('col-sm-3', 'col-xs-6');
      
      let img = document.createElement('img');
      //img.setAttribute('src', formatUrl(item.url));
              //img.src(`${item.url}`);
      //img.setAttribute('alt', formatName(item.name));
            //img.alt(`${item.name}`);
      img.classList.add('img-thumbnail');
      
      //img.setAttribute(`${item.url}`);  // ?
      //img.src = `${item.url}`;  // ?

      let divWrapper = document.createElement('div');
      divWrapper.classList.add('info-wrapper');

          let divName = document.createElement('div');
          divName.classList.add('text-muted');

          let divDescript = document.createElement('div');
          divDescript.classList.add('text-muted', 'top-padding');
      
          let divDate = document.createElement('div');
          divDate.classList.add('text-muted');
      
          let textName = document.createTextNode(`${item.name}`);
          let textDescript = document.createTextNode(`${item.description}`);
          let textDate = document.createTextNode(`${item.date}`);

      // добавялем как дочерний елемент const element = document.querySelector('#third-line'); 
      //ДОБАВЛЯЕТСЯ ДОЧЕРНИЙ В КОНЕЦ РОДИТЕЛЬСКОГО 
      divName.appendChild(textName);
      divDescript.appendChild(textDescript);
      divDate.appendChild(textDate);

      divWrapper.appendChild(divName);
      divWrapper.appendChild(divDescript);
      divWrapper.appendChild(divDate);

      divCol.appendChild(img);
      divCol.appendChild(divWrapper);

      thirdBlock.appendChild(divCol);



      /*'<div class="col-sm-3 col-xs-6">\
      <img src="$url" alt="$name" class="img-thumbnail">\
      <div class="info-wrapper">\
          <div class="text-muted">$name</div>\
          <div class="text-muted top-padding">$description</div>\
          <div class="text-muted">$date</div>\
      </div>\
      </div>';
      */
      
    })
    //thirdBlock.innerHTML = resultElement;
  }
 
   function clearGallery() {
    firstBlock.innerHTML = '';
    secondBlock.innerHTML = '';
    thirdBlock.innerHTML = '';   
  }  

  function run() {
    clearGallery();  
    const preparedData = fetchData();
    const slicedData = sliceData(preparedData);

    switch (typeMethod.value) {
      case '1':
        // в slicedData находится необходимое количество элементов для отображения
        // строим галерею методом replace
        
        renderGalleryByReplace(slicedData);

        // показываем блок с этой галереей  
        firstGroupe.classList.remove('hide');
        secondGroupe.classList.add('hide');
        thirdGroupe.classList.add('hide');
        break;
      case '2':
        renderGalleryByString(slicedData);

        secondGroupe.classList.remove('hide');
        thirdGroupe.classList.add('hide');
        firstGroupe.classList.add('hide');
        break;
      case '3':
        renderByCreateElement(slicedData);

        thirdGroupe.classList.remove('hide');
        secondGroupe.classList.add('hide');
        firstGroupe.classList.add('hide');
        break;
      default:
        alert('Выберите вариант');
        break;
    }
  }

  btn.addEventListener("click", run);
})();
