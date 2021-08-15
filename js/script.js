'use strict';

function titleClickHandler (event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [done] remove class 'active' from all article links  */
    
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
    
  /* [DONE] add class 'active' to the clicked link */
    
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
    
  /* [DONE] remove class 'active' from all articles */
    
  const activeArticles = document.querySelectorAll('article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
    
  /* [done] get 'href' attribute from the clicked link */
    
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);
    
  /* [done] find the correct article using the selector (value of 'href' attribute) */
    
  const targetArticle = document.querySelector (articleSelector);
  console.log('targetArticle:', targetArticle); 
    
  /* [DONE] add class 'active' to the correct article */
    
  targetArticle.classList.add('active');
  console.log(targetArticle);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTagListSelector = '.tags.list',
  optAuthorsListSelector = 'authors.list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
    
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML='';   

  /* for each article */
    
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
    
  let html = '';
    
  for(let article of articles){
    
    /* get the article id */
    
    const articleId = article.getAttribute('id');
    console.log(articleId);
    
    /* find the title element */
    
    /* get the title from the title element */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);  
      
    /* create HTML of the link */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
        
    /* insert link into titleList */
    
    html = html + linkHTML;
    console.log(html);
         
  }
    
  titleList.innerHTML = html;
    
  const links = document.querySelectorAll ('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click' , titleClickHandler);
  }
}
    
generateTitleLinks();

function CalculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  }
  console.log(params);
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  console.log(tags);
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};  
    
  /* find all articles */
    
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);  
    
  /* START LOOP: for every article: */
    
  for(let article of articles){
      
    /* find tags wrapper */
      
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);   
      
    /* make html variable with empty string */
      
    let html = '';        
      
    /* get tags from data-tags attribute */
      
    const articleTags = article.getAttribute('data-tags');
      
    /* split tags into array */
      
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
      
    /* START LOOP: for each tag */
    
    for (let tag of articleTagsArray){
      console.log(tag);
        
      /* generate HTML of the link */
        
      const linkHTMLtag = '<li><a href="#tag-'+ tag +'">'+ tag +'</a></li> ';
        
      /* add generated code to html variable */
        
      html = html + linkHTMLtag;
      console.log(linkHTMLtag);
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add generated code to allTags array */
      allTags[tag] = 1;
      } else {
          allTags[tag]++;
      }      
        
      /* END LOOP: for each tag */
    }
  
    /* insert HTML of all the links into the tags wrapper */
        
    tagsWrapper.innerHTML = html;
        
    /* END LOOP: for every article: */
}
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links html code */
    
    const tagsParams = CalculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags */
    
    for(let tag in allTags){
        
    /* [NEW] generate code of a link and add it to allTagsHTML */
//    allTagsHTML += tag + '(' + allTags[tag] + ')'; //old//
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag +  '</a></li> ';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
    }
    
    /* [NEW] end loop for each tag in alltags */
    /* [NEW] add html from allTags to tagList */
    
    tagList.innerHTML = allTagsHTML;
    
}


generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
    
  event.preventDefault();
    
  /* make new constant named "clickedElement" and give it the value of "this" */
    
  const clickedElement = this;
    
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    
  const href = clickedElement.getAttribute('href');
    
  /* make a new constant "tag" and extract tag from the "href" constant */
    
  const tag = href.replace('#tag-', '');
    
  /* find all tag links with class active */
    
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    
  /* START LOOP: for each active tag link */
    
  for (let tagLink of tagLinks){
    console.log(tagLinks);
        
    /* remove class active */
        
    tagLink.classList.remove('active');
        
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
    
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    
  /* START LOOP: for each found tag link */
    
  for (let tagLinkHref of tagLinksHref){
    console.log(tagLinkHref);

    /* add class active */
        
    tagLinkHref.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
    
  generateTitleLinks('[data-tags~="' + tag + '"]');  

}

function addClickListenersToTags(){
    
  /* find all links to tags */
    
  const links = document.querySelectorAll('a[href^="#tag-"]');
    
  /* START LOOP: for each link */
    
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
      
    link.addEventListener('click', tagClickHandler);
      
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
/* find all articles */
    
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);  
    
  /* START LOOP: for every article: */
    
  for(let article of articles){
    
    /* find authors wrapper */
      
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);   
      
    /* make html variable with empty string */
      
    let html = '';        
      
    /* get author from data-author attribute */
      
    const articleAuthors = article.getAttribute('data-author');
      
    /*  for each author create HTML of the link */
        
    const linkHTMLauthor = '<a href="#author-'+ articleAuthors +'">'+ articleAuthors +'</a>';
        
    /* add generated code to html variable */
        
    html = linkHTMLauthor;

    /* insert HTML of all the links into the tags wrapper */
        
    authorsWrapper.innerHTML = html;
        
    /* END LOOP: for every article: */
    
  }
}
   
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
    
  event.preventDefault();
    
  /* make new constant named "clickedElement" and give it the value of "this" */
    
  const clickedElement = this;
    
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    
  const href = clickedElement.getAttribute('href');
    
  /* make a new constant "author" and extract tag from the "href" constant */
    
  const author = href.replace('#author-', '');
    
  /* find all author links with class active */
    
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    
  /* START LOOP: for each active tag link */
    
  for (let activeAuthor of activeAuthors){
        
    activeAuthor.classList.remove('active');
        
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
    
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    
  /* START LOOP: for each found tag link */
    
  for (let authorLinkHref of authorLinksHref){
    console.log(authorLinkHref);

    /* add class active */
        
    authorLinkHref.classList.add('active');

  /* END LOOP: for each found tag link */
      
  }
    
  /* execute function "generateTitleLinks" with article selector as argument */
    
  generateTitleLinks('[data-author="' + author + '"]');  

}

function addClickListenersToAuthors(){
    
    /* find all links to authors */
    
  const links = document.querySelectorAll('a[href^="#author-"]');
    
  /* START LOOP: for each link */
    
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
      
  link.addEventListener('click', authorClickHandler);
      
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();