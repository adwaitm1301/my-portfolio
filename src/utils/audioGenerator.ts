/**
 * Generates a lofi ambient track on demand using Web Audio API.
 * Creates a simple, chill background tone suitable for a portfolio.
 */

export async function generateLofiAudio(): Promise<Blob> {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const sampleRate = audioContext.sampleRate
  const duration = 30 // 30 second loop
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  // Simple lofi ambient: layered sine waves with slight randomness
  for (let i = 0; i < buffer.length; i++) {
    const time = i / sampleRate

    // Base frequencies for a chill lofi vibe (C major ish)
    const freq1 = 65.41 // C2
    const freq2 = 130.81 // C3
    const freq3 = 98.0 // G2

    // Layer 1: Low bass note
    const wave1 = Math.sin((2 * Math.PI * freq1 * time) % (2 * Math.PI)) * 0.15

    // Layer 2: Mid tone
    const wave2 = Math.sin((2 * Math.PI * freq2 * time * 0.5) % (2 * Math.PI)) * 0.1

    // Layer 3: Harmonic
    const wave3 = Math.sin((2 * Math.PI * freq3 * time * 0.25) % (2 * Math.PI)) * 0.08

    // Add subtle randomness for natural feel
    const noise = (Math.random() - 0.5) * 0.02

    // Fade in/out to avoid clicks
    const fadeDuration = 2
    let envelope = 1
    if (time < fadeDuration) {
      envelope = time / fadeDuration
    } else if (time > duration - fadeDuration) {
      envelope = (duration - time) / fadeDuration
    }

    data[i] = (wave1 + wave2 + wave3 + noise) * envelope * 0.3
  }

  // Encode to WAV format (simpler than MP3)
  const wav = encodeWAV(buffer)
  return new Blob([wav], { type: 'audio/wav' })
}

function encodeWAV(audioBuffer: AudioBuffer): ArrayBuffer {
  const length = audioBuffer.length * audioBuffer.numberOfChannels * 2 + 44
  const arrayBuffer = new ArrayBuffer(length)
  const view = new DataView(arrayBuffer)
  const channels: Float32Array[] = []

  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i))
  }

  // WAV file header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  const sampleRate = audioBuffer.sampleRate
  const sampleCount = audioBuffer.length
  const byteRate = sampleRate * 2 * audioBuffer.numberOfChannels
  const blockAlign = audioBuffer.numberOfChannels * 2

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + sampleCount * audioBuffer.numberOfChannels * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, audioBuffer.numberOfChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, sampleCount * audioBuffer.numberOfChannels * 2, true)

  let offset = 44
  for (let i = 0; i < sampleCount; i++) {
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, channels[channel][i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
      offset += 2
    }
  }

  return arrayBuffer
}
