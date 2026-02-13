"use client";

import React, { useMemo, useState } from "react";

export default function ValentinesCardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  const message1 = useMemo(
    () =>
      `Happy Valentine’s Day, love. 💕 Even though this is our first Valentine’s and I can’t be there to celebrate because I’m far away, know that I love you so much and miss you more than words can say. Always remember that you are my one and only love, and I’m always here for you—no matter the distance.`,
    []
  );

  const message2 = useMemo(
    () =>
      `I can’t wait for the day I can finally celebrate with you in person. Until then, keep smiling and always remember: I’m proud of you, I love you, and I’m choosing you every single day. 🌷`,
    []
  );

  const resetCard = () => {
    setIsOpen(false);
    setStep(1);
    setIsCatModalOpen(false);
  };

  const openFolder = () => {
    if (!isOpen) setIsOpen(true);
  };

  const openCatModal = () => {
    setIsCatModalOpen(true);
  };

  const closeCatModal = () => {
    setIsCatModalOpen(false);
  };

  return (
    <div className="wrap">
      <div className="bg" />

      <div className="card" aria-label="Valentine card">
        {/* Header */}
        <div className="header">
          <div className="titleWrap">
            <span className="dot" />
            <span className="title">Valentine Card</span>
          </div>

          <button
            className="closeBtn"
            onClick={resetCard}
            disabled={!isOpen}
            aria-disabled={!isOpen}
            type="button"
          >
            Close
          </button>
        </div>

        {/* Folder area */}
        <div className="stage">
          {/* Folder clickable area */}
          <div
            className={`folder ${isOpen ? "open" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={isOpen ? "Message opened" : "Tap to open message"}
            onClick={openFolder}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openFolder();
            }}
          >
            <div className="folderBack" />
            <div className="folderTab" />

            <div className="folderFront">
              <div className="label">
                <span className="labelTitle">My Message</span>
                <span className="labelSub">
                  {isOpen ? "Opened 💗" : "Tap to open"}
                </span>
              </div>

              <div className="heart" aria-hidden="true">
                ♥
              </div>

              <div className="shine" aria-hidden="true" />
            </div>

            {/* Letter */}
            <div className={`letter ${isOpen ? "show" : ""}`}>
              {/* stop click so it won't re-trigger folder click */}
              <div className="paper" onClick={(e) => e.stopPropagation()}>
                <div className="paperHeader">
                  <span className="badge">To my love</span>
                  <span className="date">Happy Valentine’s Day</span>
                </div>

                <div className="paperBody">
                  {step === 1 ? (
                    <p>{message1}</p>
                  ) : (
                    <p className="raised">{message2}</p>
                  )}
                </div>

                <div className="paperFooter">
                  {/* ✅ Step 1 button WITHOUT cat.jpg */}
                  {step === 1 && (
                    <button
                      className="nextBtn"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setStep(2);
                      }}
                      aria-label="Next message"
                    >
                      <span className="nextTextOnly">Next</span>
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  )}

                  {/* ✅ Step 2: normal next button then show Cat.jpg modal */}
                  {step === 2 && (
                    <button
                      className="nextBtn"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openCatModal();
                      }}
                      aria-label="Open cat photo"
                    >
                      <span className="nextTextOnly">Next</span>
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hint">
          {!isOpen
            ? "Tap the folder to open 💌"
            : step === 1
            ? "Tap Next"
            : "Tap Next"}
        </div>
      </div>

      {isCatModalOpen && (
        <div
          className="modalOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Cat photo"
          onClick={closeCatModal}
        >
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button
              className="modalClose"
              type="button"
              onClick={closeCatModal}
              aria-label="Close modal"
            >
              Close
            </button>
            <img
              src="/images/Cat.jpg"
              alt="Cat holding a flower"
              className="modalImg"
            />
            <div className="modalCaption">
              Flowers for my Only Love, I love you, I miss you and Happy
              Valentines day love
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(html, body) {
          height: 100%;
        }

        .wrap {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Arial, "Apple Color Emoji", "Segoe UI Emoji";
        }

        .bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              900px 520px at 18% 8%,
              rgba(255, 76, 141, 0.22),
              transparent 60%
            ),
            radial-gradient(
              900px 520px at 85% 20%,
              rgba(255, 150, 120, 0.18),
              transparent 58%
            ),
            linear-gradient(180deg, #ffffff 0%, #fff3f8 55%, #ffffff 100%);
        }

        .card {
          width: min(720px, 100%);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.14);
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 18px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.88)
          );
        }

        .titleWrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #ff2b78, #ff7a59);
          box-shadow: 0 10px 24px rgba(255, 43, 120, 0.25);
        }

        .title {
          font-weight: 900;
          font-size: 15px;
          letter-spacing: 0.2px;
          color: #111827;
        }

        .closeBtn {
          appearance: none;
          border: 1px solid rgba(17, 24, 39, 0.22);
          background: #ffffff;
          color: #111827;
          font-weight: 800;
          font-size: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.12s ease, opacity 0.12s ease,
            box-shadow 0.12s ease;
          box-shadow: 0 10px 18px rgba(0, 0, 0, 0.06);
        }
        .closeBtn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          box-shadow: none;
        }
        .closeBtn:not(:disabled):active {
          transform: scale(0.98);
        }

        .stage {
          padding: 22px 18px 8px;
        }

        .folder {
          position: relative;
          width: 100%;
          cursor: pointer;
          text-align: left;
          border-radius: 18px;
          padding: 0;
          min-height: 420px;
          outline: none;
        }
        .folder:focus-visible {
          box-shadow: 0 0 0 4px rgba(255, 43, 120, 0.18);
        }

        .folderBack {
          position: absolute;
          left: 10px;
          right: 10px;
          top: 110px;
          height: 250px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ffe1ee, #ffe9e2);
          border: 1px solid rgba(17, 24, 39, 0.08);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .folderTab {
          position: absolute;
          left: 24px;
          top: 78px;
          width: 210px;
          height: 52px;
          border-radius: 16px 16px 12px 12px;
          background: linear-gradient(135deg, #ffd3e7, #ffe0d8);
          border: 1px solid rgba(17, 24, 39, 0.08);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
        }

        .folderFront {
          position: absolute;
          left: 10px;
          right: 10px;
          top: 132px;
          height: 250px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ffffff, #fff7fb);
          border: 1px solid rgba(17, 24, 39, 0.1);
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }

        .label {
          position: absolute;
          top: 18px;
          left: 18px;
          display: grid;
          gap: 4px;
          z-index: 2;
        }
        .labelTitle {
          font-weight: 950;
          font-size: 18px;
          color: #111827;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        .labelSub {
          font-weight: 800;
          font-size: 12px;
          color: rgba(17, 24, 39, 0.68);
        }

        .heart {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #ff2b78, #ff7a59);
          color: white;
          font-size: 18px;
          box-shadow: 0 18px 34px rgba(255, 43, 120, 0.25);
          z-index: 2;
        }

        .shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            420px 160px at 20% 10%,
            rgba(255, 43, 120, 0.1),
            transparent 60%
          );
          pointer-events: none;
        }

        .letter {
          position: absolute;
          left: 26px;
          right: 26px;
          top: 145px;
          opacity: 0;
          transform: translateY(160px);
          transition: opacity 0.35s ease,
            transform 0.65s cubic-bezier(0.2, 0.9, 0.2, 1);
          pointer-events: none;
        }
        .letter.show {
          opacity: 1;
          transform: translateY(-4px);
          pointer-events: auto;
        }

        .paper {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(17, 24, 39, 0.1);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.14);
          overflow: hidden;
        }

        .paperHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 14px 14px;
          background: linear-gradient(
            135deg,
            rgba(255, 43, 120, 0.14),
            rgba(255, 122, 89, 0.12)
          );
          border-bottom: 1px solid rgba(17, 24, 39, 0.06);
        }

        .badge {
          font-weight: 900;
          font-size: 12px;
          color: #111827;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.86);
          border: 1px solid rgba(17, 24, 39, 0.1);
        }

        .date {
          font-weight: 800;
          font-size: 12px;
          color: rgba(17, 24, 39, 0.7);
        }

        .paperBody {
          padding: 18px 16px 10px;
        }
        .paperBody p {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(17, 24, 39, 0.88);
          white-space: pre-wrap;
        }

        .raised {
          transform: translateY(-10px);
        }

        .paperFooter {
          padding: 12px 14px 14px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
        }

        /* Step 1 Next button (no cat image) */
        .nextBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          border: 1px solid rgba(17, 24, 39, 0.18);
          background: #ffffff;
          padding: 10px 14px;
          cursor: pointer;
          box-shadow: 0 14px 26px rgba(0, 0, 0, 0.1);
          transition: transform 0.12s ease;
        }
        .nextBtn:active {
          transform: scale(0.98);
        }
        .nextTextOnly {
          font-weight: 900;
          font-size: 12px;
          color: #111827;
          letter-spacing: 0.2px;
        }
        .arrow {
          font-weight: 900;
          color: rgba(17, 24, 39, 0.6);
        }

        /* Step 2 final button = cat photo only */
        .finalBtn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          border-radius: 999px;
          transition: transform 0.12s ease;
        }
        .finalBtn:active {
          transform: scale(0.96);
        }
        .finalCatImg {
          width: 56px;
          height: 56px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid rgba(255, 43, 120, 0.35);
          box-shadow: 0 16px 34px rgba(255, 43, 120, 0.22);
        }

        .modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(17, 24, 39, 0.55);
          display: grid;
          place-items: center;
          padding: 20px;
          z-index: 50;
        }

        .modalContent {
          width: min(520px, 92vw);
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(17, 24, 39, 0.12);
          border-radius: 18px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          position: relative;
        }

        .modalClose {
          position: absolute;
          top: 12px;
          right: 12px;
          appearance: none;
          border: 1px solid rgba(17, 24, 39, 0.22);
          background: #ffffff;
          color: #111827;
          font-weight: 900;
          font-size: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
        }

        .modalImg {
          display: block;
          width: 100%;
          height: auto;
        }

        .modalCaption {
          padding: 14px 16px 16px;
          text-align: center;
          font-weight: 900;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(17, 24, 39, 0.8);
          background: rgba(255, 255, 255, 0.92);
          border-top: 1px solid rgba(17, 24, 39, 0.08);
        }

        .signature {
          font-weight: 950;
          font-size: 13px;
          background: linear-gradient(135deg, #ff2b78, #ff7a59);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hint {
          text-align: center;
          padding: 14px 16px 16px;
          font-size: 12px;
          font-weight: 800;
          color: rgba(17, 24, 39, 0.62);
          border-top: 1px solid rgba(17, 24, 39, 0.06);
          background: rgba(255, 255, 255, 0.85);
        }

        .folder.open .folderFront {
          transform: translateY(10px);
          transition: transform 0.45s ease;
        }
      `}</style>
    </div>
  );
}
