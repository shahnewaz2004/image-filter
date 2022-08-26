const input = document.getElementById('file-input');
const select = document.querySelector('.select');
const save = document.querySelector('.save');
const reset = document.querySelector('.reset');
const imagePrev = document.querySelector('.image_side img');
const controls = document.querySelectorAll("input[type='range']");
const transform = document.querySelectorAll('button.transform');
const link = document.getElementById('link');

let brightness = '100', saturation = '100' , inversion = '0', grayscale = '0';
let rotate = 0, flipHorizontal = 1, flipVertical = 1;



select.addEventListener('click', function(){
    input.click();
})

input.addEventListener('change', function(e){
    const file = e.target.files[0];
    imagePrev.src = URL.createObjectURL(file)
})

function applyFilter(){
    imagePrev.style.filter = `brightness(${brightness}%)
                             saturate(${saturation}%) invert(${inversion}%)
                             grayscale(${grayscale}%)`;

    imagePrev.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}


controls.forEach(function(v) {
    v.addEventListener('input', function(){
       if(v.name === 'brightness'){
         v.parentElement.children[0].children[1].innerText = `${v.value}%`;
         brightness = v.value;
       }else if(v.name === 'saturation'){
        v.parentElement.children[0].children[1].innerText = `${v.value}%`;
         saturation = v.value;
       }else if(v.name === 'inversion'){
        v.parentElement.children[0].children[1].innerText = `${v.value}%`;
         inversion = v.value;
       }else{
        v.parentElement.children[0].children[1].innerText = `${v.value}%`;
        grayscale = v.value;
       }

       applyFilter()
    })
})

transform.forEach(v => {
    v.addEventListener('click', function(){
        if(v.name === 'left'){
            rotate -=  90;
        }else if(v.name === 'right'){
            rotate += 90;
        }else if(v.name === 'horizontal'){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }

        applyFilter();
    })
})



const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imagePrev.naturalWidth;
    canvas.height = imagePrev.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(imagePrev, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

save.addEventListener('click', function(){
    saveImage();
})

reset.addEventListener('click', function(){
    brightness = '100';
    saturation = '100';
    inversion = '0';
    grayscale = '0';
    rotate = 0;
    flipHorizontal = 1;
    flipVertical = 1;
    controls.forEach(function(v) {
           if(v.name === 'brightness'){
               v.value = brightness;
               v.parentElement.children[0].children[1].innerText = `${brightness}%`;
           }else if(v.name === 'saturation'){
               v.value = saturation;
               v.parentElement.children[0].children[1].innerText = `${saturation}%`;
           }else if(v.name === 'inversion'){
               v.value = inversion;
               v.parentElement.children[0].children[1].innerText = `${inversion}%`;
           }else{
               v.value = grayscale;
               v.parentElement.children[0].children[1].innerText = `${grayscale}%`;
           }
    })
    applyFilter();
})