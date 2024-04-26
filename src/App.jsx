/**
 * "Jejak ku tinggalkan untuk kau teruskan, bangkitkanku dalam perjuanganmu."
 */
import { useAudioRecorder } from "react-audio-voice-recorder";
import { HiCursorClick } from "react-icons/hi";
import { RiFocus3Fill } from "react-icons/ri";
import { FaCheck, FaStopCircle, FaMicrophone } from "react-icons/fa";
import { TiRefresh, TiPencil } from "react-icons/ti";
import { BiSolidMessageError } from "react-icons/bi";
import { IoText } from "react-icons/io5";
import cn from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import capitalize from "capitalize";

const ORIGINAL = "ORIGINAL";
const LOWER = "LOWER";
const UPPER = "UPPER";
const CAPITALIZE = "CAPITALIZE";
const WORD = "WORD";
const CHAR = "CHAR";
const MAX_SECOND = 15;
const SILENT_THRESHOLD = 0.1;
const DEFAULT_FONT_SIZE = 4.7;
const MIC_ERR_MESSAGE = "Sila pastikan anda mempunyai mikrofon, dan laman ini diberi kebenaran untuk mengakses mikrofon anda."; // prettier-ignore
const CASE_MODE = [ORIGINAL, LOWER, UPPER, CAPITALIZE];
const SS_KEY_TEXT = "resultText";

export default function App() {
  const [hoverMode, setHoverMode] = useState(WORD);
  const [focusMode, setFocusMode] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [resultText, setResultText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [caseMode, setCaseMode] = useState(ORIGINAL);
  const [errMessage, setErrMessage] = useState(""); // kalau ada isi, maksudnya dialog akan show
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder(null, () => {
    reset();
    setErrMessage(MIC_ERR_MESSAGE);
  });
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE); // em

  useEffect(() => {
    if (!recordingBlob) return;
    uploadFile(recordingBlob);
  }, [recordingBlob]);

  useEffect(() => {
    setHasResult(false);
    setResultText("");
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      let remaining = MAX_SECOND - recordingTime;
      if (remaining <= 0) {
        stopRecord();
      }
    }
  }, [isRecording, recordingTime]);

  useEffect(() => {
    if (errMessage !== "") {
      document.getElementById("errorDialog").showModal();
    } else {
      document.getElementById("errorDialog").close();
    }
  }, [errMessage]);

  function toggleCase() {
    try {
      let index = CASE_MODE.findIndex((v) => v === caseMode);
      let newIndex = index + 1;
      if (newIndex > 3) {
        newIndex = 0;
      }
      let newMode = CASE_MODE[newIndex];

      let text = "";
      if (newMode === ORIGINAL) {
        text = sessionStorage.getItem(SS_KEY_TEXT);
      } else if (newMode === LOWER) {
        text = resultText.toLowerCase();
      } else if (newMode === UPPER) {
        text = resultText.toUpperCase();
      } else if (newMode === CAPITALIZE) {
        text = capitalize.words(resultText);
      }

      setCaseMode(newMode);
      setResultText(text);
    } catch (error) {
      // kalau apa-apa jadi, fallback ke original
      setCaseMode(ORIGINAL);
      setResultText(sessionStorage.getItem(SS_KEY_TEXT));
    }
  }

  async function uploadFile(file) {
    try {
      let isSilent = await isAudioSilent(file);
      if (isSilent) {
        throw new Error("Suara tidak dapat dikesan! Sila cuba sekali lagi.");
      }

      let formData = new FormData();
      formData.append("file", file, "audio.mp4");

      let res = await axios.post("/api/upload", formData);
      let result = res?.data ?? "";
      setResultText(result);
      setHasResult(true);
      setIsProcessing(false);
      sessionStorage.setItem(SS_KEY_TEXT, result);
    } catch (e) {
      setErrMessage(e?.response?.data || e?.message);
      reset();
    }
  }

  function startRecord() {
    startRecording();
  }

  function stopRecord() {
    stopRecording();
    setIsProcessing(true);
  }

  function toggleHoverMode() {
    if (hoverMode === WORD) {
      setHoverMode(CHAR);
    } else if (hoverMode === CHAR) {
      setHoverMode(WORD);
    }
  }

  function reset() {
    setHasResult(false);
    setResultText("");
    setIsProcessing(false);
    setFontSize(DEFAULT_FONT_SIZE);
    sessionStorage.removeItem(SS_KEY_TEXT);
  }

  return (
    <>
      <div className="flex flex-col z-10 h-dvh px-44 py-20 z-10 relative">
        <div className="flex-1 bg-white shadow-xl rounded-2xl border-8 border-stone-700 flex flex-col overflow-auto">
          <div className="flex-1 flex overflow-hidden">
            <div
              className="font-bold leading-[1.2em] text-left overflow-y-auto p-5 px-10 result flex-1 rounded-t-2xl"
              style={{ fontSize: fontSize + "em" }}
            >
              {isEditMode && (
                <textarea
                  autoFocus
                  value={resultText}
                  onChange={(e) => setResultText(e.target.value)}
                  className="w-[100%] h-[100%] bg-transparent resize-none"
                ></textarea>
              )}

              {!isEditMode && hasResult && (
                <ResultText
                  mode={hoverMode}
                  resultText={resultText}
                  focusMode={focusMode}
                />
              )}

              {!isEditMode && !hasResult && (
                <div className="flex items-center justify-center text-left select-none h-[100%]">
                  <div className="aspect-auto flex-1 flex justify-end">
                    <img src="/kid_mic.png" draggable={false} />
                  </div>
                  <div className="flex-1 flex justify-start">
                    <LabelTengah
                      isRecording={isRecording}
                      isProcessing={isProcessing}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-b from-white to-slate-300 pt-3 pb-6 px-3 border-t-4 border-slate-800 flex gap-3 rounded-b-lg">
            {isRecording && (
              <>
                <Button variant="red" rounded="full" onClick={stopRecord}>
                  <FaStopCircle size={30} />
                  Berhenti
                </Button>
                <div className="flex items-center font-bold text-xl text-red-700 pl-5">
                  ...berbaki {MAX_SECOND - recordingTime} saat (atau tekan
                  Berhenti)
                </div>
              </>
            )}

            {!isRecording && (
              <Button
                variant="red"
                rounded="full"
                onClick={startRecord}
                disabled={isProcessing || isEditMode}
              >
                <FaMicrophone size={30} />
                Rakam Suara
              </Button>
            )}

            <div className="flex-1"></div>

            {hasResult && (
              <div className="flex flex-col justify-center items-center gap-2 px-3">
                <span className="font-bold text-orange-800">Saiz tulisan</span>
                <input
                  className="slider"
                  type="range"
                  min="1"
                  max="7"
                  step="0.3"
                  defaultValue={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
              </div>
            )}

            <Button
              onClick={toggleHoverMode}
              disabled={!hasResult || isEditMode}
            >
              <div className="w-[120px]">
                <div className="flex items-center justify-center gap-2">
                  <HiCursorClick size={30} /> Hover
                </div>
                <div className="text-sm">
                  ( {hoverMode === CHAR ? "Huruf" : "Perkataan"} )
                </div>
              </div>
            </Button>

            <Button onClick={toggleCase} disabled={!hasResult || isEditMode}>
              <IoText size={25} />
            </Button>

            <Button
              onClick={() => setFocusMode(!focusMode)}
              disabled={!hasResult || isEditMode}
            >
              <RiFocus3Fill size={25} />
            </Button>

            {isEditMode ? (
              <Button variant="green" onClick={() => setIsEditMode(false)}>
                <FaCheck size={35} />
              </Button>
            ) : (
              <Button
                disabled={!hasResult}
                variant="green"
                onClick={() => setIsEditMode(true)}
              >
                <TiPencil size={35} />
              </Button>
            )}

            <Button
              variant="orange"
              disabled={!hasResult || isEditMode}
              onClick={reset}
            >
              <TiRefresh size={40} />
            </Button>
          </div>
        </div>
        <div className="py-5 text-center font-bold text-stone-800 text-xs leading-5 select-none">
          <p>
            Dicipta sebagai satu alternatif untuk membantu kanak-kanak belajar
            membaca daripada pertuturan mereka sendiri.
          </p>
          <p>
            Browser terbaik setakat ini Google Chrome. Firefox ada masalah
            delay. Safari rakaman tak jadi apa. Oleh{" "}
            <a
              target="_blank"
              href="https://facebook.com/luqmanrasa"
              className="underline"
            >
              Luqman B. Shariffudin
            </a>{" "}
            &#183; Source code:{" "}
            <a
              href="https://github.com/mansarip/tuturbaca"
              target="_blank"
              className="underline"
            >
              Github
            </a>
          </p>
        </div>
      </div>
      <div className="z-0 absolute top-0 left-0 right-0 bottom-0 bg-[url('/bg.webp')] bg-no-repeat bg-cover bg-bottom opacity-20"></div>

      {/* onCancel diperlukan untuk handle ESC key */}
      <dialog
        id="errorDialog"
        onCancel={() => setErrMessage("")}
        className="relative bg-white px-5 py-4 rounded-lg shadow-xl border-4 border-red-500 max-w-[500px] select-none"
      >
        <div className="flex items-center gap-5">
          <div>
            <BiSolidMessageError size={60} color="red" />
          </div>
          <div className="font-semibold text-2xl">{errMessage}</div>
        </div>
        <div className="flex justify-end border-t-4 border-stone-200 mt-3 pt-3">
          <button
            className="bg-stone-100 px-5 py-2 border-4 border-stone-400 rounded-lg font-bold"
            onClick={() => setErrMessage("")}
          >
            Tutup
          </button>
        </div>
      </dialog>
    </>
  );
}

function Button({
  children,
  variant = "blue",
  rounded = "lg",
  onClick,
  disabled = false,
}) {
  const classPrefix =
    "button px-5 h-16 select-none transition-all duration-150";

  const colorVariants = {
    blue: "active:translate-y-2 bg-blue-500 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-400 hover:bg-gradient-to-b from-cyan-500 to-blue-500",
    red: "active:translate-y-2 bg-red-500 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#f80032,0_0px_0_0_#f8260841] [box-shadow:0_10px_0_0_#f80032,0_15px_0_0_#f8260841] border-b-[1px] border-red-400 hover:bg-gradient-to-b from-orange-500 to-red-500",
    teal: "active:translate-y-2 bg-teal-500 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#11a699,0_0px_0_0_#16decc41] [box-shadow:0_10px_0_0_#11a699,0_15px_0_0_#16decc41] border-b-[1px] border-teal-400 hover:bg-gradient-to-b from-teal-400 to-teal-500",
    green:
      "active:translate-y-2 bg-green-500 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#159947,0_0px_0_0_#22c55d41] [box-shadow:0_10px_0_0_#159947,0_15px_0_0_#22c55d41] border-b-[1px] border-green-400 hover:bg-gradient-to-b from-green-400 to-green-500",
    orange:
      "active:translate-y-2 bg-orange-500 active:border-b-[0px] active:[box-shadow:0_0px_0_0_#e96f19,0_0px_0_0_#f9731541] [box-shadow:0_10px_0_0_#e96f19,0_15px_0_0_#f9731541] border-b-[1px] border-orange-400 hover:bg-gradient-to-b from-orange-400 to-orange-500",
  };

  const roundedVariants = {
    full: "rounded-full",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick || null}
      className={cn(
        classPrefix,
        disabled ? "bg-gray-400 cursor-not-allowed" : colorVariants[variant],
        roundedVariants[rounded] || "rounded-lg"
      )}
    >
      <span className="flex justify-center items-center h-full text-white font-bold text-xl gap-2">
        {children}
      </span>
    </button>
  );
}

function LabelTengah({ isRecording, isProcessing }) {
  if (isRecording) {
    return (
      <div className="leading-tight">
        <div className="text-5xl pb-5">Merakam suara...</div>
        <div className="loader"></div>
      </div>
    );
  }

  if (!isRecording && isProcessing) {
    return (
      <div className="leading-tight">
        <div className="text-5xl pb-5">
          Memproses rakaman,
          <br />
          sila tunggu...
        </div>
        <div className="loader process"></div>
      </div>
    );
  }

  return (
    <span className="text-5xl leading-tight">
      Mulakan dengan
      <br />
      merakam suara anda!
    </span>
  );
}

function ResultText({ mode, resultText = "", focusMode }) {
  const SpanWrapper = ({ children }) => (
    <span
      className={cn("hover:text-red-600", {
        "text-stone-400": focusMode,
      })}
    >
      {children}
    </span>
  );

  if (mode === CHAR) {
    return resultText
      .split("")
      .map((c, index) => <SpanWrapper key={index}>{c}</SpanWrapper>);
  }

  if (mode === WORD) {
    return resultText.split(" ").map((c, index) => (
      <SpanWrapper key={index}>
        {c}
        {index < resultText.length - 1 ? " " : ""}
      </SpanWrapper>
    ));
  }
}

function isAudioSilent(audioBlob) {
  return new Promise((resolve, reject) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const reader = new FileReader();

    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
      audioContext.decodeAudioData(
        arrayBuffer,
        (audioBuffer) => {
          const audioData = audioBuffer.getChannelData(0);
          const threshold = SILENT_THRESHOLD;
          let silent = true;

          for (let i = 0; i < audioData.length; i++) {
            if (Math.abs(audioData[i]) > threshold) {
              silent = false;
              break;
            }
          }
          resolve(silent);
        },
        (e) => reject(e)
      );
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(audioBlob);
  });
}
