{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault(); //prevents from scrolling to the position reffered on the page
    const clickedElement = this;
    console.log('link was clicked!');
    /* remove class 'active' from all article links*/
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /*add class 'active' to the clicked link*/
    console.log('clicked: ', clickedElement);
    clickedElement.classList.add('active');
    /*remove class 'active' from all articles*/
    const activeArticles = document.querySelectorAll('article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /*get 'href' attribute from the clicked link*/
    const selectedLink = clickedElement.getAttribute('href');
    console.log(selectedLink.slice(1));
    /*find the correct article using the selector (value of 'href' attribute)*/
    const selectedArticle = document.getElementById(selectedLink.slice(1));
    /*add class 'active' to the correct article */
    selectedArticle.classList.add('active');
    //one line code:
    //document.getElementById(clickedElement.getAttribute('href').slice(1)).classList.add('active');
  }



  const generateTitleLinks = function (){
    console.log('cleaning titles');
    const linkss = document.querySelectorAll('.titles'),
    articles = document.querySelectorAll('article');

    /*usuń zawartość listy linków w lewej kolumnie,*/
    for(let link of linkss){
      link.innerHTML = "";
    }
    
    //następnie dla każdego artykułu:
    for(let article of articles){
      /*odczytaj jego id i zapisz je do stałej,*/
      const articleId = article.getAttribute('id'), //article.id;
      /*znajdź element z tytułem i zapisz jego zawartość do stałej,*/
      articleTitle = article.children[0].innerHTML,
      /*na podstawie tych informacji stwórz kod HTML linka i zapisz go do stałej,*/
      textHTML = '<a ' + 'href="#' + articleId + '"><span>' + articleTitle + '</span></a>',
      /*wstaw stworzony kod HTML do listy linków w lewej kolumnie.*/
      li = document.createElement('li');
      li.innerHTML = textHTML;
      document.querySelector('.titles').appendChild(li);
    }

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();












}
