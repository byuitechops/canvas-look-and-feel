/*eslint-env node, browser, jquery*/

/* Inject necessary scripts */
var jQuery = document.createElement('script');
jQuery.type = 'text/javascript';
jQuery.setAttribute("async", "");
jQuery.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
document.body.appendChild(jQuery);

var jQui = document.createElement('script');
jQui.type = 'text/javascript';
jQui.setAttribute("async", "");
jQui.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js';
document.body.appendChild(jQui);

var bootStrap = document.createElement('script');
bootStrap.type = 'text/javascript';
bootStrap.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js';
document.body.appendChild(bootStrap);

var slickScript = document.createElement('script');
slickScript.type = 'text/javascript';
slickScript.setAttribute("async", "");
slickScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
document.body.appendChild(slickScript);

var slickScriptCss = document.createElement('link');
slickScriptCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css';
slickScriptCss.rel = 'stylesheet';
document.body.appendChild(slickScriptCss);

var slickScriptTheme = document.createElement('link');
slickScriptTheme.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css';
slickScriptTheme.rel = 'stylesheet';
document.body.appendChild(slickScriptTheme);

window.onload = function () {
    
  /* Initialize carousels*/
  if ($('.carousel').length !== 0) {
    $('.carousel').slick({
      dots: true
    });
  }
  
  /* Initialize accordion*/
  $('div.accordion').accordion({
    heightStyle: 'content',
    collapsible: true,
    active: false
  });
  
  /* Generate course home pages */
  if ($('#navigation .steps').length !== 0) {
    $('#navigation .steps').remove();
      if($('#navigation .lessons').hasClass('generate')){
        $('#navigation h2').remove()
        $('#navigation .lessons').remove()
      }
  }
}
/* Insert h5p scripts */
var h5pScript = document.createElement('script');
h5pScript.setAttribute('charset', 'UTF-8');
h5pScript.setAttribute('src', 'https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js');
document.body.appendChild(h5pScript);

/* Insert custom video tag generation scripts */
var videos = document.getElementsByClassName('byui-video')
for (var i = 0; i < videos.length; i++) {
  if (videos[i].dataset.source == 'youtube') {
    videos[i].innerHTML = '<iframe width="' + videos[i].dataset.width + 'px" height="' + videos[i].dataset.height + 'px" src="https://www.youtube.com/embed/' + videos[i].dataset.vidid + '" frameborder="0" allowfullscreen></iframe>';
  } else if (videos[i].dataset.source == 'kaltura') {
    videos[i].innerHTML = '<iframe width="' + videos[i].dataset.width + 'px" height="' + videos[i].dataset.height + 'px"  src="https://cdnapisec.kaltura.com/p/1157612/sp/115761200/embedIframeJs/uiconf_id/29018071/partner_id/1157612?iframeembed=true&amp;playerId=kaltura_player_1485805514&amp;entry_id=' + videos[i].dataset.vidid + '&amp;flashvars[streamerType]=auto" frameborder="0" allowfullscreen></iframe>';
  }
}