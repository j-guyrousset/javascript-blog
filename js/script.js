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

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }













}
