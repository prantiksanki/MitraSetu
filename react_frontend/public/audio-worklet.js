class PCMProcessor extends AudioWorkletProcessor {
  process (inputs) {
    const input = inputs[0];
    if (input && input[0]) {
      const channel = input[0];
      const pcm = new ArrayBuffer(channel.length * 2);
      const view = new DataView(pcm);
      for (let i = 0; i < channel.length; i++) {
        let s = Math.max(-1, Math.min(1, channel[i]));
        view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
      this.port.postMessage(pcm, [pcm]);
    }
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
