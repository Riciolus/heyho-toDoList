import { useEffect, useRef, useState } from "react";

// Define the types for the options object
interface SpeechRecognitionOptions {
  interimResults?: boolean;
  lang?: string;
  continuous?: boolean;
}

// Define the return type for the hook
interface UseSpeechToText {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
}

const useSpeechToText = (
  options: SpeechRecognitionOptions = {}
): UseSpeechToText => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Web speech api is not supported.");
      return;
    }

    // Initialize recognition
    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.interimResults = options.interimResults ?? true;
    recognition.lang = options.lang ?? "id-ID";
    recognition.continuous = options.continuous ?? false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, [options]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      console.log("stoplistening");

      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    setTranscript,
  };
};

export default useSpeechToText;
