import React from "react";
import {
  Sequence,
  useVideoConfig,
  AbsoluteFill,
  Freeze,
  Audio, staticFile
} from "remotion";
import { Fade } from "./utils/Fade";

type TranscriptItem = {
  question: string;
  answer: string[];
};

export const transcript: TranscriptItem[] = [
  {
    question: "What is the true essence of my being?",
    answer: [
      "Take a deep breath, close your eyes, and feel your presence.",
      "Notice that beyond your body and mind, there is a simple feeling of being.",
      "Can you sense this presence that doesn't change? This is your true essence."
    ],
  },
  {
    question: "Can I find myself in my thoughts?",
    answer: [
      "Notice your thoughts as they come and go, like clouds passing in the sky.",
      "Are you these thoughts, or are you the one noticing them?",
      "Observe carefully—there is a deeper 'you' that is aware of these thoughts."
    ],
  },
  {
    question: "What is this sense of 'I' that I feel?",
    answer: [
      "Feel the sense of 'I' that arises naturally.",
      "Don't add any labels like 'I am this' or 'I am that.'",
      "Is this 'I' a thought, or is it something deeper that feels steady and unchanging?"
    ],
  },
  {
    question: "Am I the roles I play in life?",
    answer: [
      "Think of all the roles you play—student, parent, friend.",
      "These are parts you act out, but are they who you truly are?",
      "If you put aside all these roles, what remains? Can you feel the deeper you that is always here?"
    ],
  },
  {
    question: "What is aware of my body and sensations?",
    answer: [
      "Bring your attention to your body.",
      "Feel the sensations—warmth, pressure, or movement.",
      "Notice that there is something that is aware of all these sensations. What is this awareness? It seems to be here no matter what changes in the body."
    ],
  },
  {
    question: "Is there a separation between me and the world around me?",
    answer: [
      "Look around you. Notice your surroundings, the sounds, the sights.",
      "Is there truly a boundary between you and the world, or is this boundary something created by your thoughts?",
      "Are you not simply awareness in which everything appears?"
    ],
  },
  {
    question: "Who is the observer of my experiences?",
    answer: [
      "Notice your experiences—feelings, thoughts, sensations.",
      "Now, turn your attention inward and try to find the observer.",
      "Can you find a separate 'me' that is observing, or is there simply observing happening without a separate observer?"
    ],
  },
  {
    question: "What is here when I let go of everything I know?",
    answer: [
      "Imagine letting go of everything—your name, your past, your thoughts.",
      "For a moment, drop all identifications.",
      "What is left? Can you feel the stillness, the pure being that remains? This is your true self, beyond all ideas and beliefs."
    ],
  },
  {
    question: "Am I in control of my life?",
    answer: [
      "Watch your actions and decisions for a moment.",
      "Are they truly controlled by a separate 'I,' or do they simply arise naturally, like the wind blowing or a flower blooming?",
      "Notice if there is really an 'I' in control, or if life is just happening."
    ],
  },
  {
    question: "What is my true nature beyond all appearances?",
    answer: [
      "Let go of all appearances—your body, your personality, your emotions.",
      "What remains when you let go of all of this?",
      "There is a simple, peaceful presence that remains untouched. Rest in this presence and recognize it as your true nature."
    ],
  },
];

export const transcriptDisplayDuration = 59.5 * 3; // seconds

const bgColor = "#0D0D0D";

export const Transcript: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Audio src={staticFile('binaural.mp3')} />
      {transcript.map((item, index) => {
        const from = index * transcriptDisplayDuration * fps;

        return (
          <Sequence
            key={index}
            from={from}
            durationInFrames={transcriptDisplayDuration * fps}
          >
            <Fade bgColor={bgColor} type="out" durationInFrames={fps} startAt={transcriptDisplayDuration * fps - fps}>
            <Fade bgColor={bgColor} type="in" durationInFrames={fps} startAt={0}> 
            <Freeze frame={0}>
              <AbsoluteTranscript
                question={item.question}
                answer={item.answer}
              />
            </Freeze>
            </Fade>
            </Fade>
          </Sequence>
        );
      })}
    </>
  );
};

const AbsoluteTranscript: React.FC<{ question: string; answer: string[] }> = ({
  question,
  answer,
}) => {

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#C0C0C0",
        fontFamily: "monospace",
        padding: 300,
      }}
    >
      <h1 style={{ color: "#FEFAF0", fontSize: "60px" }}>{question}</h1>
      <ul>
      {answer.map((line, index) => (
        <li key={index} style={{marginBottom:"2rem", textAlign:"start",fontSize: "40px" }}>
          {line}
        </li>
      ))}
      </ul>
    </AbsoluteFill>
  );
};
