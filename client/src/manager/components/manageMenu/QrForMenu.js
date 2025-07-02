import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { QRCodeSVG } from "qrcode.react";
import Loading from "../Loading";

const QrForMenu = ({ setSection }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, userSubscriptions, activePlans } = useContext(AuthContext);
  const restaurant_code = user?.restaurant_code;
  const qrCodeRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    if (!activePlans.includes("Scan For Menu")) {
      alert(
        "You need to buy or renew to Scan For Menu plan to access this page."
      );
      window.location.reload();
    }
    setIsLoading(false);
  }, []);

  const printQRCode = () => {
    const printContent = qrCodeRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { text-align: center; font-family: Arial, sans-serif; }
            .qr-container { padding: 20px; }
            .qr-container h2 { font-size: 18px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h2 style="margin-bottom: 25px;">Scan the QR Code to View Menu</h2>
            ${printContent}
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  const menuLink = `${process.env.REACT_APP_MENU_URL}/${restaurant_code}`;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {activePlans.includes("Scan For Menu") && (
        <section className="content" id="qrformenu">
          <div className="container-fluid">
            <div className="row" style={{ border: "none" }}>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">View Menu</h3>
                    <div className="card-tools mx-2">
                      <button
                        type="button"
                        className="btn btn-block btn-dark"
                        id="addBtn"
                        onClick={() => setSection("ViewMenu")}
                      >
                        <img src="../../dist/img/view.svg" alt="view" /> View Menu
                      </button>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                      <h3 className="my-4 font-weight-bold">Menu QR Code</h3>

                      {restaurant_code && (
                        <>
                          <p>Scan the QR code to view your restaurant menu:</p>
                          <div ref={qrCodeRef}>
                            <QRCodeSVG size={300} value={menuLink} />
                          </div>

                          <button
                            className="btn btn-secondary my-5"
                            onClick={printQRCode}
                          >
                            Print QR Code
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default QrForMenu;
