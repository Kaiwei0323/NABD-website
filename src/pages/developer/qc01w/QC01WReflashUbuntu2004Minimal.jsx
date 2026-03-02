import QC01WReflashTemplate from './QC01WReflashTemplate'
import SftpPassword from '../../../components/SftpPassword'

const QC01WReflashUbuntu2004Minimal = () => {
  return (
    <QC01WReflashTemplate title="Ubuntu 20.04 (Minimal)">
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
        <p className="dev-sop-block-text">
          Press and hold the Recovery button (Fn2) with a SIM card eject tool, then plug in the power cable.
          Keep holding the Fn2 button for 3 seconds. The indication light will remain dark blue, meaning QC01W
          is in EDL mode.
        </p>
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
          alt="Confirm QC01W EDL mode indicator"
        />
      </div>

      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Download Ubuntu 20.04 (Minimal) image package</h3>
        <p className="dev-sop-block-text">
          Download the Ubuntu 20.04 (Minimal) image package from the SFTP server to your host computer, then
          extract it.
        </p>
        <ol className="dev-sop-steps">
          <li>
            Connect to SFTP:
            <ul className="dev-sop-sublist">
              <li>Host: <code>99.64.152.69</code></li>
              <li>Port: <code>22</code></li>
              <li>Username: <code>qcs6490</code></li>
              <li>Password: <SftpPassword /></li>
            </ul>
          </li>
          <li>
            Download:
            <div className="dev-sop-inline-code">
              <code>/Files/QC01W/QCUbuntu/image/v1.0.12.0/QFIL_flat.zip</code>
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
        <h3 className="dev-sop-block-title">Install desktop image</h3>
        <p className="dev-sop-block-text">
          After the base image is flashed, install the desktop image from the SFTP server and run the offline
          presetup script.
        </p>
        <ol className="dev-sop-steps">
          <li>
            Connect to SFTP:
            <ul className="dev-sop-sublist">
              <li>Host: <code>99.64.152.69</code></li>
              <li>Port: <code>22</code></li>
              <li>Username: <code>qcs6490</code></li>
              <li>Password: <SftpPassword /></li>
            </ul>
          </li>
          <li>
            Download:
            <div className="dev-sop-inline-code">
              <code>/Files/QC01W/QCUbuntu/ubuntu/1.0.7.x_20251001.zip</code>
            </div>
          </li>
          <li>Extract the ZIP file on the host computer.</li>
          <li>Open the extracted folder and double click <code>presetup-desktop_offline-perf.bat</code>.</li>
        </ol>
      </div>

      <div className="dev-sop-block">
        <h3 className="dev-sop-block-title">Desktop login and admin</h3>
        <p className="dev-sop-block-text">Default desktop login:</p>
        <div className="dev-credentials-box">
          <div className="dev-cred-row">
            <span className="dev-cred-label">Username</span>
            <code className="dev-cred-value">aim</code>
          </div>
          <div className="dev-cred-row">
            <span className="dev-cred-label">Password</span>
            <code className="dev-cred-value">aim123</code>
          </div>
        </div>
        <p className="dev-sop-block-text dev-sop-block-text-spaced">
          <strong>Admin in terminal:</strong> run <code>su</code>, then enter password <code>oelinux123</code>.
        </p>
        <div className="dev-credentials-box dev-cred-admin">
          <div className="dev-cred-row">
            <span className="dev-cred-label">Root password</span>
            <code className="dev-cred-value">oelinux123</code>
          </div>
        </div>
        <p className="dev-sop-block-text dev-sop-warning">
          <strong>Important:</strong> Do not run <code>apt upgrade</code> on this system or it will break the
          system dependencies.
        </p>
      </div>
    </QC01WReflashTemplate>
  )
}

export default QC01WReflashUbuntu2004Minimal

