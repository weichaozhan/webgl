import Audio from '../../images/audio.mp3';

// audio 操作
const audio = document.querySelector('audio');

audio.src = Audio;
audio.load();

audio.addEventListener('loadedmetadata', () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();
  const bufferLength = 256;
  const dataArray = new Uint8Array(bufferLength);
  source.connect(analyser);
  source.connect(audioCtx.destination);
  
  // canvas
  const waveCanvas = document.getElementById('wave-surver');
  const waveCanvasCtx = waveCanvas.getContext('2d');
  const rectWidth = 500/bufferLength;
  const radgrad4 = waveCanvasCtx.createLinearGradient(500,150,50,0);
  
  radgrad4.addColorStop(0, '#F4F201');
  radgrad4.addColorStop(0.8, '#E4C700');
  radgrad4.addColorStop(1, '#e4d77c');
  
  audio.addEventListener('timeupdate', () => {
    analyser.getByteFrequencyData(dataArray);
  });

  let isPlaying = false;
  const doAnimate = () => {
    if (isPlaying) {
      requestAnimationFrame(doAnimate);
    }

    waveCanvasCtx.clearRect(0,0,500,500);
    waveCanvasCtx.lineWidth = rectWidth;
    waveCanvasCtx.strokeStyle = radgrad4;
    
    dataArray.forEach((item, index) => {
      waveCanvasCtx.beginPath();
      waveCanvasCtx.moveTo(rectWidth * index, 500);
      waveCanvasCtx.lineTo(rectWidth * index, 500 - item);
      waveCanvasCtx.stroke();
      waveCanvasCtx.closePath();
    });
  }

  audio.addEventListener('play', () => {
    isPlaying = true;
    doAnimate();
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
  });

  audio.play();
});

