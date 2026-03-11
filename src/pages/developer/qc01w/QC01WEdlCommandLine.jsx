import { Link, useNavigate } from 'react-router-dom'
import '../../Developer.css'

const QC01WEdlCommandLine = () => {
  const navigate = useNavigate()

  return (
    <div className="developer-page">
      <div className="developer-container">
        <h1>QC01W – Enter EDL via command line</h1>
        <p className="developer-subtitle">
          Reference for entering EDL (Emergency Download) mode using ADB/command line on supported operating
          systems.
        </p>

        <div className="developer-card">
          <button
            type="button"
            className="dev-back-link"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <h2 className="dev-sop-page-title">Supported operating systems</h2>

          <div className="dev-sop-stack">
            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">QCLinux (default image)</h3>
              <p className="dev-sop-block-text">
                When QC01W is running the QCLinux image and ADB is available on the host computer:
              </p>
              <ol className="dev-sop-steps">
                <li>Connect QC01W to the host PC over USB cable.</li>
                <li>From the host PC terminal:
                  <div className="dev-sop-inline-code">
                    <code>adb shell reboot edl</code>
                  </div>
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Ubuntu 20.04 (Minimal)</h3>
              <p className="dev-sop-block-text">
                When QC01W is running the Ubuntu 20.04 (Minimal) image and ADB is available on the host computer:
              </p>
              <ol className="dev-sop-steps">
                <li>Connect QC01W to the host PC over USB cable.</li>
                <li>
                  From the host PC terminal, gain root ADB:
                  <div className="dev-sop-inline-code">
                    <code>adb root</code>
                  </div>
                </li>
                <li>
                  Then reboot to EDL:
                  <div className="dev-sop-inline-code">
                    <code>adb reboot edl</code>
                  </div>
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Android</h3>
              <p className="dev-sop-block-text">
                When QC01W is running the Android image and ADB is available on the host computer:
              </p>
              <ol className="dev-sop-steps">
                <li>Connect QC01W to the host PC over USB cable.</li>
                <li>
                  From the host PC terminal, gain root ADB:
                  <div className="dev-sop-inline-code">
                    <code>adb root</code>
                  </div>
                </li>
                <li>
                  Then reboot to EDL:
                  <div className="dev-sop-inline-code">
                    <code>adb reboot edl</code>
                  </div>
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Ubuntu 24.04</h3>
              <p className="dev-sop-block-text">
                Command-line EDL entry is not supported on Ubuntu 24.04. Please refer to the{' '}
                <strong>Using Hardware Buttons</strong> method in the Ubuntu 24.04 SOP page.
              </p>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Windows (IoT)</h3>
              <p className="dev-sop-block-text">
                Command-line EDL entry is not supported on Windows (IoT). Please refer to the{' '}
                <strong>Using Hardware Buttons</strong> method in the Windows (IoT) SOP page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QC01WEdlCommandLine

