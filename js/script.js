'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('article.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
//const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
//const optAuthorsListSelector = 'authors.list',
const optAuthorClassCount = 5;
const optAuthorClassPrefix = 'author-size-';

//function clearMessages(){
//  titleList.innerHTML = '';
//}

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
  console.log(optTitleListSelector + customSelector);
  let html = '';
  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */

    html = html + linkHTML;

  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };
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
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
	
  /* [NEW] create a new variable allTags with an empty object */
	
  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles) {

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log({tagsWrapper});

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray) {

      /* generate HTML of the link */

      const linkHTMLData = {id: tag};
      const linkHTML = templates.articleTagLink(linkHTMLData);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
		
      //if(!allTags.hasOwnProperty(tag)){
      if(!Object.prototype.hasOwnProperty.call('tag')){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */	
      console.log(html);
    }
    /* insert HTML of all the links into the tags wrapper */	  
    tagsWrapper.innerHTML = html;

  }
  /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
	
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
	
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
	
  for(let tag in allTags){	  
  /* [NEW] generate code of link and add it to allTagsHTML*/
  //  [replaced with below]  const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '  ' + ' </a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);

}

function tagClickHandler(event){
	
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Tag was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href + ' został kliknięty');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each active tag link */

  for (let tagLink of tagLinks){

    /* remove class active */

    tagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    console.log('Usunięta klasa activ');

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLinkHref of tagLinksHref){

    /* add class active */

    tagLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */

    console.log(tagLinkHref);

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const links = document.querySelectorAll('a[href^="#tag-"]');
  console.log(links);

  /* START LOOP: for each link */

  for(let link of links){

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

function calculateAuthorsParams(authors){
	
  const params = {
    min: 999999,
    max: 0
  };
  console.log(params);
  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');
    if(authors[author] > params.max){
      params.max = authors[author];
    }
    if(authors[author] < params.min){
      params.min = authors[author];
    }
  }
  console.log(params);
  return params;
}

function calculateAuthorClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optAuthorClassCount - 1) + 1);
  return optAuthorClassPrefix + classNumber;
}

function generateAuthors(){
	
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
	
  /* find all articles */
	
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
	
  /* START LOOP: for every article: */
	
  for(let article of articles) {
    /* find authors wrapper */
	  
    const wrapperAuthors = article.querySelector(optArticleAuthorSelector);
    console.log(wrapperAuthors);
	  
    /* make html variable with empty string */
	  
    let html = '';
	  
    /* get authors from post-author attribute */
	  
    const author = article.getAttribute('post-author');
	  
    /* insert HTML of all the links into the tags wrapper */
	  
    const linkHTMLData = {id: author};
    const linkHTML = templates.articleAuthorLink(linkHTMLData);

    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    html = html + linkHTML;
    console.log(html);

    wrapperAuthors.innerHTML = html;

  }
	
  /* END LOOP: for every article: */
  /* [NEW] find list of authors in right column */
	
  const authorList = document.querySelector('.authors.list');
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log(authorsParams);
  const allAuthorsData = {authors: []};

  /* [NEW] add html from allAuthors to authorList */
	
  let allAuthorsHTML = '';
  for(let author in allAuthors){
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateAuthorClass(allAuthors[author], authorsParams)
    });
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

}

function authorClickHandler(event){

  event.preventDefault();
  const clickedElement = this;
  console.log('Author was clicked!');

  const href = clickedElement.getAttribute('href');
  console.log(href + ' został kliknięty');

  const author = href.replace('#author-', '');

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);

  for (let authorLink of authorLinks){
    authorLink.classList.remove('active');
    console.log('Usunięta klasa activ');
  }

  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLinkHref of authorLinksHref) {
    authorLinkHref.classList.add('active');
    console.log(authorLinkHref);
  }

  generateTitleLinks('[post-author="' + author + '"]');

}


function addClickListenersToAuthors(){

  const links = document.querySelectorAll('a[href^="#author-"]');
  console.log(links);

  for(let link of links) {
    link.addEventListener('click', authorClickHandler);
  }

}

generateTitleLinks();

generateTags();

addClickListenersToTags();

generateAuthors();

addClickListenersToAuthors();