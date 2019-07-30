import Audio from '../../images/audio.mp3';

// 产生声音
function productSound() {
  // 音阶频率
  const arrFrequency = {
    0: 0, '·1': 262, '·2': 294, '·3': 330, '·4': 349, '·5': 392, '·6': 440, '·7': 494, '1': 523, '2': 587, '3': 659, '4': 698, '5': 784, '6': 880, '7': 988, '1·': 1047, '2·': 1175, '3·': 1319, '4·': 1397, '5·': 1568, '6·': 1760, '7·': 1967,
  };
  // 音符
  const arrNotes = ['0', '·1', '·2', '·3', '·4', '·5', '·6', '·7', '1', '2', '3', '4', '5', '6', '7', '1·', '2·', '3·', '4·', '5·', '6·', '7·'];
  const tigers = [1,2,3,1,0, 1,2,3,1,0, 3,4,5,0, 3,4,5,0, 5,6,5,4,0, 3,1,0, 5,6,5,4,0, 3,1,0, 2,'·5',0, 1,0, 2,'·5',0, 1,0,];
  
  const audioContext= new AudioContext(); // 音频上下文
  const oscillator = audioContext.createOscillator(); // 创建 OscillatorNode 表示一个周期性波形，音调
  const gainNode = audioContext.createGain(); // 创建一个GainNode，它可以控制音频的总音量
  
  oscillator.connect(gainNode); // 音频音量关联
  gainNode.connect(audioContext.destination); // 关联音频设备
  
  oscillator.type = 'sine'; // 设置波形
  oscillator.frequency.value = 196; // 设置频率
  
  // 音乐
  let index = 0;
  let timeout = null;
  let playSound = () => {
    const frequency = arrFrequency[tigers[index]];

    if (frequency === undefined) {
      return;
    }

    const timer = frequency === 0 ? 50 :  300;
    
    // oscillator.frequency.value = 500 + ((Math.random() * 100).toFixed(0) * 1);
    oscillator.frequency.value = frequency;
    
    
    if (frequency) {
      gainNode.gain.setValueAtTime(0, audioContext.currentTime); // 设置当前时间音量为 0， 0 - 1
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01); // audioContext.currentTime + 0.01 时音量线性变化到 1 
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + timer/1000); // audioContext.currentTime + 1 时音量指数变化到 0.001  
    }
    
    index ++;
    timeout = setTimeout(playSound, timer);
  }

  // 播放控制
  let isPlaying = false;
  let audioStart = false;
  document.querySelector('#sound-created').addEventListener('click', (e) => {
    if (!audioStart) {
      audioStart = true;
      oscillator.start(audioContext.currentTime); // 开始播放声音
    }

    if (!isPlaying) {
      e.target.innerHTML = '暂停';
      isPlaying = true;
      oscillator.connect(audioContext.destination); // 播放
      playSound();
    } else {
      e.target.innerHTML = '播放';
      isPlaying = false;
      oscillator.disconnect(audioContext.destination); //暂停
      clearTimeout(timeout);
    }
  })
}
productSound();

// audio 操作
function buildAudioWave() {
  const audio = document.querySelector('audio');
  
  audio.src = Audio;
  audio.load();
  
  audio.addEventListener('loadedmetadata', () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    const bufferLength = 512;
    const dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);
    source.connect(audioCtx.destination);
    
    // canvas
    const waveCanvas = document.getElementById('wave-surver');
    const canvasWidth = waveCanvas.offsetWidth;
    const canvasHeight = waveCanvas.offsetHeight;
  
    const waveCanvasCtx = waveCanvas.getContext('2d');
    const rectWidth = Math.ceil(canvasWidth/bufferLength*100)/100;
    const radgrad4 = waveCanvasCtx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    
    radgrad4.addColorStop(0, '#f3cd13');
    radgrad4.addColorStop(0.8, '#20ddf1');
    radgrad4.addColorStop(1, '#f16d20');
    
    // audio.addEventListener('timeupdate', () => {
    //   analyser.getByteFrequencyData(dataArray);
    // });
  
    let isPlaying = false;
    const doAnimate = () => {
      if (isPlaying) {
        requestAnimationFrame(doAnimate);
      }
      
      analyser.getByteFrequencyData(dataArray);
      waveCanvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      waveCanvasCtx.lineWidth = rectWidth;
      waveCanvasCtx.strokeStyle = radgrad4;
      
      dataArray.forEach((item, index) => {
        waveCanvasCtx.beginPath();
        waveCanvasCtx.moveTo(rectWidth * index, canvasHeight/2);
        waveCanvasCtx.lineTo(rectWidth * index, (canvasHeight - item)/2);
        waveCanvasCtx.lineTo(rectWidth * index, (canvasHeight + item)/2);
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
  
    audioCtx.resume().then(() => {
      audio.play();
    });
  });
};
// buildAudioWave();

// 完整曲目波形
function buildWholeWave() {
  fetch(Audio)
    .then(res => {
      return res.arrayBuffer();
    })
    .then(buffer => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createBufferSource();
  
      audioCtx.decodeAudioData(buffer)
        .then(decodedData => {
          // 交叉合并左右声道的数据
          function interleaveLeftAndRight (left, right) {
            let totalLength = left.length + right.length;
            let data = new Float32Array(totalLength);
            for (let i = 0; i < left.length; i++) {
                let k = i * 2;
                data[k] = left[i];
                data[k + 1] = right[i];
            }
            return data;
          }
          const leftChannel = decodedData.getChannelData(0);
          const rightChannel = decodedData.getChannelData(1);
          
          let dataArray = interleaveLeftAndRight(leftChannel, rightChannel).map(item => item * 32768/128/255).map(item => item * 255/2).filter((item, index) => !(index%2048));
          
          // // canvas
          const waveCanvas = document.getElementById('wave-surver');
          const canvasWidth = waveCanvas.offsetWidth;
          const canvasHeight = waveCanvas.offsetHeight;
        
          const waveCanvasCtx = waveCanvas.getContext('2d');
          const rectWidth = Math.floor(canvasWidth/dataArray.length*100)/100;
          const radgrad4 = waveCanvasCtx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
          
          radgrad4.addColorStop(0, '#1890ff');
          radgrad4.addColorStop(0.8, '#1890ff');
          radgrad4.addColorStop(1, '#1890ff');
          
          waveCanvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
          waveCanvasCtx.lineWidth = rectWidth;
          waveCanvasCtx.strokeStyle = '#1890ff';
  
          const middle = canvasHeight/2;
  
          const draw = (item, index) => {
            const width = rectWidth * index;
  
            waveCanvasCtx.beginPath();
            waveCanvasCtx.moveTo(width, middle);
            waveCanvasCtx.lineTo(width, middle - item);
            waveCanvasCtx.moveTo(width, middle);
            waveCanvasCtx.lineTo(width, middle + item);
            waveCanvasCtx.stroke();
            waveCanvasCtx.closePath();
          }
          dataArray.forEach(draw);
        });
    });
}
// buildWholeWave();
