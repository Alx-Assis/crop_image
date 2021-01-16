const photoFile = document.getElementById("photo-file")
const photoPreview=document.getElementById("photo-preview");
const selection = document.getElementById("selection-tool");
const CropImageButton = document.getElementById("crop-image");
const downloadButton = document.getElementById("download-button");
const selectImage=document.getElementById('select-image');
const image = new Image();

selectImage.onclick = ()=>{
	photoFile.click();
}

	window.addEventListener("DOMContentLoaded",()=>{
	
		photoFile.addEventListener("change",()=>{
		
				let file = photoFile.files.item(0);
				console.log(file);
				
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload=function (ev) {
					
					image.src=ev.target.result;
					
				}
		})
})

/*selection tool*/

let startX,startY,relativeStartX,relativeStartY,
endX,endY,relativeEndX,relativeEndY;

let startSelection = false;

const events={
	mouseover(){
		this.style.cursor = 'crosshair';
	},
	mousedown(){
		const {clientX,clientY,offsetX,offsetY} = event;
		
		/*
		console.table({
			"client":[clientX,clientY],
			"offSet":[offsetX,offsetY]
		})
		*/
		startSelection=true;
		
		startX = clientX;
		startY = clientY;
		relativeStartX = offsetX;
		relativeStarty = offsetY;
		
	},
	mousemove(){
		if(startSelection){
			endX=event.clientX;
			endY=event.clientX;
			selection.style.display='initial';
		
			selection.style.top=startY+'px';
			selection.style.left=startX+'px';
			selection.style.width=(endX-startX)+"px";
			selection.style.height=(endY-startY)+"px";
		};
		
	},
	mouseup(){
		startSelection=false;
		relativeEndX=event.layerX;
		relativeEndY=event.layerY;
	}
};
	
Object.keys(events)
.forEach(eventName=>{
	photoPreview.addEventListener(eventName,events[eventName])
});

//criar o canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");


image.onload=function(){
	const {width,height}=image;
	canvas.width=width;
	canvas.height=height;
	
	//limpar contexto
	ctx.clearRect(0,0,width,height);
	
	//desenhar imagem no contexto
	ctx.drawImage(image,0,0);
	
	photoPreview.src=canvas.toDataURL();
	
	
};

//evento de corte

CropImageButton.onclick=()=>{
	const {width:imgW,height:imgH}=image;
	const {width:previewW,height:previewH}=photoPreview;
	
	const [widthFactor,heightFactor]=[
		+(imgW/previewW),
		+(imgH/previewH)
		]
	const [selectionWidth,selectionHeight]=[
		+selection.style.width.replace("px",""),
		+selection.style.height.replace("px","")
		]
	const [croppedWidth,croppedHeight]=[
		+(selectionWidth*widthFactor),
		+(selectionHeight*heightFactor)
		]
	const [actualX,actualY]=[
		+(relativeStartX*widthFactor),
		+(relativeStartY*heightFactor)
		]
		
  // pegar do ctx a imagem cortada
  const croppedImage= ctx.getImageData(actualX,actualY,croppedWidth,croppedHeight);
  
  //limpar o ctx
  ctx.clearRect(0,0,ctx.width,ctx.height);
  
  //ajuste de proporções
  image.width=canvas.width=croppedWidth;
  image.height=canvas.height=croppedHeight;
  
  ctx.putImageData(croppedImage,0,0);
  
  //esconder ferramenta de seleção
  selection.style.display="none";
  
  //altualizar preview da imagem
  photoPreview.src=canvas.toDataURL();
  
}

