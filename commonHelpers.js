import{a as b,S as w,i}from"./assets/vendor-f144e563.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))h(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&h(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function h(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const m={BASE_URL:"https://pixabay.com/api/",API_KEY:"44527465-372387a79420ecddf2afa63d2"};async function p({currentQuery:t,currentPage:r}){const{data:o}=await b.get(`${m.BASE_URL}?key=${m.API_KEY}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${r}`);return o}let a=1,n="";const v=document.getElementById("search-form"),f=document.querySelector(".gallery"),u=document.querySelector(".load-more"),d=()=>u.classList.add("hide"),E=()=>u.classList.remove("hide"),g=document.querySelector(".loader-wrapper"),y=()=>g.classList.remove("hide"),c=()=>g.classList.add("hide"),$=new w(".gallery a",{});v.addEventListener("submit",async t=>{if(t.preventDefault(),f.innerHTML="",a=1,n=t.target.searchQuery.value.trim(),y(),d(),!n){i.error({title:"Error",position:"topRight",message:"Please enter a valid search query."}),c();return}try{const r=await p({currentQuery:n,currentPage:a});L(r)}catch{i.error({title:"Error",position:"topRight",message:"Failed to fetch images. Please try again."}),c()}});u.addEventListener("click",async()=>{a+=1,y();try{const r=await p({currentQuery:n,currentPage:a});L(r)}catch{i.error({title:"Error",position:"topRight",message:"Failed to fetch images. Please try again."}),c()}const{height:t}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})});function L(t){if(c(),t.hits.length===0){d(),i.info({title:"Info",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."});return}P(t.hits),E(),a===1&&i.success({title:"Success",position:"topRight",message:`Hooray! We found ${t.totalHits} images.`}),t.totalHits<=a*40&&(d(),i.info({title:"Error",position:"topRight",message:"We're sorry, but you've reached the end of search results."})),$.refresh()}function P(t){const r=t.map(o=>`
    <a href="${o.largeImageURL}" class="photo-card">
      <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <i class="fas fa-heart"></i> <b>Likes</b> ${o.likes}
        </p>
        <p class="info-item">
          <i class="fas fa-eye"></i> <b>Views</b> ${o.views}
        </p>
        <p class="info-item">
          <i class="fas fa-comment"></i> <b>Comments</b> ${o.comments}
        </p>
        <p class="info-item">
          <i class="fas fa-download"></i> <b>Downloads</b> ${o.downloads}
        </p>
      </div>
    </a>
  `).join("");f.insertAdjacentHTML("beforeend",r)}
//# sourceMappingURL=commonHelpers.js.map
