var video = document.querySelector('.recording');
var output = document.querySelector('.output');
var start = document.querySelector('.start-btn');
var stop = document.querySelector('.stop-btn');
var anc = document.querySelector(".download-anc")
var data = [];
  

var recording = navigator.mediaDevices.getDisplayMedia({
    video: {
        mediaSource: 'screen',
    },
    audio: true,
})
    .then(async (e) => {
  

        let audio = await navigator.mediaDevices.getUserMedia({ 
            audio: true, video: false })
  

        video.srcObject = e;
  
 
        let combine = new MediaStream(
            [...e.getTracks(), ...audio.getTracks()])
  
      
        let recorder = new MediaRecorder(combine);
  
        start.addEventListener('click', (e) => {
  
           
            recorder.start();
            alert("recording started")
  
         
            data = []
        });
  
        stop.addEventListener('click', (e) => {
  
      
            recorder.stop();
            alert("recording stopped")
        });
  
  
        recorder.ondataavailable = (e) => {
            data.push(e.data);
        };
  
        recorder.onstop = () => {
  
          
            let blobData = new Blob(data, { type: 'video/mp4' });
  
        
            let url = URL.createObjectURL(blobData)
  
       
            output.src = url
            anc.href = url
        };
    });