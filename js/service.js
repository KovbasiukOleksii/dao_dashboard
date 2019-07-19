var dragSource = null;

function handleDragStart(event){
  // Start
  $(this).addClass('grabbed');
  
  // das zu verschiebende Element zwischenspeichern
  dragSource = this;
  
  // IE 11 hat Probleme mit 'datatransfer'
  //event.originalEvent.dataTransfer.effectAllowed = 'move';
  //event.originalEvent.dataTransfer.setData('text/html',$(this).html());
}

function handleDragEnter(event){
  // Drag über ein anderes Element erhält die Klasse 'over'
  $(this).addClass('over');
}

function handleDragLeave(event){
  // 'over'-Klasse wieder entfernen, wenn das 'drag'-Element nicht mehr darüber ist.
  $(this).removeClass('over');
}

function handleDragOver(event){
  if(event.preventDefault) event.preventDefault();

  event.originalEvent.dataTransfer.dropEffect = 'move';
}

function handleDrop(event){
  if(event.stopPropagation) event.stopPropagation();
  
  if(dragSource != this){
    
    // workaround wegen IE 11
    var temp = $(dragSource).html();
    
    $(dragSource).html($(this).html());
    $(this).html(temp);
    
    // IE 11 hat Probleme mit 'dataTransfer'
    //$(this).html(event.originalEvent.dataTransfer.getData('text/html'));
  }
  
  return false;
}

function handleDragEnd(event){
  // Drag'n'Drop abgeschlossen. Alle Elemente auf Ursprung zurücksetzen
  $('#wrapper .over').removeClass('over');
  $(this).removeClass('grabbed');
}

$('#wrapper .drag')
  .on('dragstart',  handleDragStart)
  .on('dragenter',  handleDragEnter)
  .on('dragleave',  handleDragLeave)
  .on('dragover',   handleDragOver)
  .on('drop',       handleDrop)
  .on('dragend',    handleDragEnd);

var snapper = new Snap({
	element: document.getElementById('content')
});

var addEvent = function addEvent(element, eventName, func) {
	if (element.addEventListener) {
    	return element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        return element.attachEvent("on" + eventName, func);
    }
};

addEvent(document.getElementById('open-left'), 'click', function(){
	snapper.open('left');
});

snapper.settings({
    disable: 'right',
    maxPosition: 240,
});


/* Prevent Safari opening links when viewing as a Mobile App */
(function (a, b, c) {
    if(c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener("click", function (a) {
            d = a.target;
            while(!f.test(d.nodeName)) d = d.parentNode;
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
        }, !1)
    }
})(document, window.navigator, "standalone");

$(document).on('click', '.lang a', function(){
    $(this).addClass('active_lang').siblings().removeClass('active_lang')
});