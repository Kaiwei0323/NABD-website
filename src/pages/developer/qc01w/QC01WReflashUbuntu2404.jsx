import QC01WReflashTemplate from './QC01WReflashTemplate'
import { Link } from 'react-router-dom'

const QC01WReflashUbuntu2404 = () => {
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  }

  const WGET_CMD =
    'wget -c https://www.inventecna.com/files/qcs6490/Files/QC01W/QCUbuntu/24.04/rb3_ubuntu_images_QC01W.x06.zip'

  return (
    <QC01WReflashTemplate
      title="Ubuntu 24.04"
    >
      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Environment setup</h3>
        <p className="dev-sop-block-text">
          Connect QC01W to your host computer using a Type‑C cable, and connect an Ethernet cable to QC01W.
        </p>
        <img
          className="dev-sop-image"
          src="/image/environment_setup.png"
          alt="Environment setup: QC01W connected to host via Type-C and Ethernet"
        />
      </div>

      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Enter EDL mode</h3>
        <ol className="dev-sop-steps">
          <li>
            <strong>Option 1. Using the Command Line</strong>
            <br />
            • Refer to the command line instructions <Link to="/developer/qc01w/edl/command-line">here</Link>.
          </li>
          <li>
            <strong>Option 2. Using Hardware Buttons</strong>
            <br />
            • Press and hold the Recovery button (Fn2) using a SIM card eject tool.
            <br />
            • While holding the button, plug in the power cable.
            <br />
            • Continue holding the Fn2 button for about 3 seconds, then release it.
            <br />
            • The indicator light will remain dark blue, indicating that the QC01W is in EDL mode.
          </li>
        </ol>
        <img
          className="dev-sop-image"
          src="/image/qc01w/recovery_button.png"
          alt="QC01W Recovery button (Fn2) location"
        />
      </div>

      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Confirm EDL mode</h3>
        <p className="dev-sop-block-text">
          You can check the Device Manager on the host computer to confirm QC01W is in EDL mode.
        </p>
        <img
          className="dev-sop-image"
          src="/image/qc01w/confirm_edl_mode.png"
          alt="Confirm QC01W EDL mode indicator (dark blue status light)"
        />
      </div>

      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Download image package</h3>
        <p className="dev-sop-block-text">
          Download the Ubuntu 24.04 image package to your host computer, then extract it.
        </p>
        <ol className="dev-sop-steps">
          <li>
            Download directly via HTTPS:
            <div className="dev-sop-inline-code dev-sop-inline-code-with-copy">
              <code>{WGET_CMD}</code>
              <button
                type="button"
                className="dev-sop-copy-btn"
                onClick={() => copy(WGET_CMD)}
                aria-label="Copy wget command"
                title="Copy"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 9h10v10H9V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </li>
          <li>Extract the ZIP file on the host computer.</li>
          <li>Open the extracted folder and double click <code>_Burn_Image.bat</code>.</li>
        </ol>
      </div>

      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Start reflashing</h3>
        <p className="dev-sop-block-text">
          In the burn tool window, type <code>fd</code> and press Enter to start the reflashing process. Once
          flashing is complete, the tool will automatically reboot the device.
        </p>
        <img
          className="dev-sop-image"
          src="/image/qc01w/burn_image_option.png"
          alt='Burn tool options screen (type "fd" and press Enter)'
        />
      </div>

      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Desktop login</h3>
        <p className="dev-sop-block-text">Default desktop login:</p>
        <div className="dev-credentials-box">
          <div className="dev-cred-row">
            <span className="dev-cred-label">Username</span>
            <code className="dev-cred-value">ubuntu</code>
          </div>
          <div className="dev-cred-row">
            <span className="dev-cred-label">Password</span>
            <code className="dev-cred-value">ubuntu</code>
          </div>
        </div>
      </div>
    </QC01WReflashTemplate>
  )
}

export default QC01WReflashUbuntu2404

