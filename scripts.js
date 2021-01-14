const photoFile = document.getElementById("photo-file")
 let image=document.getElementById("photo-preview");

document.getElementById('select-image')
.onclick = function(){
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

/*selection toll*/
let startX,startY,relativeStartX,relativeStarty;
let endX,endY,relativeEndx,relativeEndy;


const events={
	mouseover(){
		this.sttle.cursor = crosshair;
	},
	mousedown(){
		const {clientX,clientY,offSetX,offSetY} = event
		/*
		console.table({
			"client":[clientX,clientY],
			"offSet":[offSetX,offSetY]
		})
		*/
		startX = clientX+"px"
		startY = clientY+"px"
		relativeStartX = offSetX+"px"
		relativeStarty = offSetY+"px"
		
	},
	mousemove(){
		endX=(startX-clientX)+"px"
		endY=(startY-clientY)+"px"
		relativeEndX=(relativeStartX-offSetX)+"px"
		relativeEndY=(relativeStartY-offSetY)+"px"
		
	},
	mouseup(){}
}
	
Object.keys(events)
.forEach(eventName=>{
	image.addEventListener(eventName,events[eventName])
})