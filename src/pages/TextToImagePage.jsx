import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TextToImagePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("http://13.51.207.98/auth/verify");
        if (res.data.status === "ok") {
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    verify();
  }, []);

  const handleClick = async () => {
    try {
      setImageData(null)
      setLoading(true)
      const res = await axios.post("http://13.51.207.98/image/generate", {
        prompt,
      });
      if (res.data.status === "ok") {
        setImageData(res.data.api_data.image)
      } else {
      }
    } catch (error) {
      console.log(error.message);
    }finally{
      setPrompt("")
      setLoading(false)
    }

  };

  const handleDownload = () => {
    if (imageData) {
      const linkSource = `data:image/png;base64,${imageData}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = 'generated-image.png';
      downloadLink.click();
    }
  };

  return (
    <div className="w-screen h-screen  bg-gradient-to-r from-blue-400 to-purple-900">
      <nav className="md:w-3/5 mx-auto p-4 text-white flex justify-between items-center">
       <h1 className="text-4xl font-futura">
          Generate Garments
        </h1>
        <button onClick={() => navigate(-1)} className="text-white font-bold py-2 px-4 rounded">
          Back
        </button>
        
      </nav>

      <div className="flex-col items-center justify-center">
        <div className="flex justify-center items-center">
          <textarea
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to generate here..."
            rows="4"
            className="w-full md:w-1/3 p-3 mx-4 md:mx-20 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleClick}
            disabled={loading}
            className="font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-teal-600 hover:bg-teal-700"
          >
            Generate
          </button>
        </div>
      </div>

      <div className="w-full h-1/2 flex justify-center items-center">
        <div className="w-1/3 h-3/4 mx-5 flex-col justify-center items-center">
          {imageData && 
         ( 
          <div className="flex-col justify-center items-center">
            <img src={`data:image/png;base64,${imageData}`} className=" h-[250px] w-[250px] mx-auto" alt="generated-image" />
            <div className="flex justify-center items-center mt-3">
              <button
                onClick={handleDownload}
                className="font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
              >
                Download
              </button>
            </div>
          </div>
         )}

          {loading && (
            <div className="flex h-full items-center justify-center" role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
