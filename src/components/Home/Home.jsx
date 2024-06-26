import React, { useEffect, useState } from "react";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import validURL from "valid-url";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import * as ReactBootstrap from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { urlThunk } from "../../redux/urlSlice";

const Home = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(false);
  const [copied, setCopied] = useState(false);
  const sm = useSelector((state) => state.url);
  // console.log(sm);
  const [url, seturl] = useState("");
  // console.log("url", url);
  const [shortenedURL, setShortenedURL] = useState("");
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUrl = (e) => {
    seturl(e.target.value);
  };

  const body = {
    longURL: url,
  };

  useEffect(() => {
    setLoading(sm.isLoading);
  }, [sm]);

  // let shortt = window.location.origin;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(url, "fr");
    // console.log(copied);

    // console.log(window.location.origin);
    if (!validURL.isWebUri(url)) {
      toast.error("Invalid url", {
        position: "top-right",
        theme: "dark",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      dispatch(urlThunk(url))
        .then((res) => {
          console.log(res);
          // console.log(url);
          // console.log(res.payload.data.shortURL);
          setShortenedURL(res.payload.data.shortURL);
          setRedirect(res.payload.data.longURL);
          // console.log(redirect);
          setStatus(true);
          return res;
        })
        .catch((err) => {
          // console.log(err);
          return err.response;
        });
    }
  };

  const handleReset = () => {
    seturl("");
    // setShortenedURL("");
  };

  const handleCopy = () => {
    setCopied(true);
    toast.success("Copied to Clipboard", {
      position: "top-right",
      theme: "dark",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // console.log(sm);
  return (
    <>
      {loading ? (
        <div className="loading">
          <ReactBootstrap.Spinner animation="border" className="spinner" />
        </div>
      ) : null}
      <div className="my-5 container text-center">
        <h1 className="head">URL SHORTENER</h1>
        <div className="my-5 text-center">
          <form>
            <div className="row text-center d-flex justify-content-center">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-8">
                <div className="inputs">
                  <input
                    className="form-control form-control-lg"
                    name="url"
                    type="text"
                    placeholder="Enter a URL"
                    // required
                    value={url}
                    onChange={handleUrl}
                  />
                </div>
              </div>
            </div>
            <button
              className="my-3 btn btn-dark"
              type="submit"
              onClick={handleSubmit}
            >
              Shorten
            </button>
            <button
              className="my-3 btn btn-danger"
              style={{ marginLeft: "10px" }}
              type="submit"
              onClick={handleReset}
            >
              Reset
            </button>
          </form>
          <div className="short-url">
            <h1>SHORT URL : </h1>
            <div className="text">
              <a
                // href={`${"https://new-url-shortener.netlify.app"}${shortenedURL}`}
                href={`${shortenedURL}`}
              >
                {status ? `${shortenedURL}` : ""}
              </a>
            </div>
            <CopyToClipboard
              className="copy"
              // text={`${"https://new-url-shortener.netlify.app"}${shortenedURL}`}
              text={`${shortenedURL}`}
              onCopy={handleCopy}
            >
              <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
                Copy URL to Clipboard
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
