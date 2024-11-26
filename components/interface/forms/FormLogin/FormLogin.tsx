"use client";
import Image from "next/image";
import logoCogel from "@/public/logo_cogel.png";
import Cookies from "../../cards/cookies/Cookies"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import geseg from "@/public/GESEG.png";
import CryptoJS from "crypto-js";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState(""); // Estado para o nome de usuário
  const [password, setPassword] = useState(""); // Estado para a senha
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessageLogin, setErrorMessageLogin] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState<boolean>(false); // Estado para controlar o carregamento

  const router = useRouter();

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleBotaoClick = () => {
    abrirModal();
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      const credentials = { username, password };
      const encryptedCredentials = CryptoJS.AES.encrypt(JSON.stringify(credentials), 'cogel').toString();
      localStorage.setItem("credentials", encryptedCredentials);
    } else {
      localStorage.removeItem("credentials");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e: any) => {
    setLoading(true); // Define o estado de carregamento como verdadeiro
    e.preventDefault();
    const newItem = { username, password };
    try {
      const response = await fetch(
        "https://api-bip.salvador.ba.gov.br/users/login",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        }
      );

      const data = await response.json();

      if (data.message === "Login successful") {
        // Use cookies to store the token and user info
        const encryptedToken = CryptoJS.AES.encrypt(data.token, 'cogel').toString();
        document.cookie = "token=" + encryptedToken + "; path=/;";

        const encryptedPermission = CryptoJS.AES.encrypt(data.user._doc.permission, 'cogel').toString();
        document.cookie = "permission=" + encryptedPermission + "; path=/;";

        const encryptedUserName = CryptoJS.AES.encrypt(data.user._doc.name, 'cogel').toString();
        document.cookie = "userName=" + encryptedUserName + "; path=/;";

        const encryptedId = CryptoJS.AES.encrypt(data.user._doc._id, 'cogel').toString();
        document.cookie = "id=" + encryptedId + "; path=/;";

        if (!data.user._doc.passwordChanged) {
          router.push("/auth/admin/changePassword");
        } else {
          // Enviar log para a API
          const logRequestBody = {
            log: `Login bem-sucedido para o usuário ${data.user._doc.name}.`,
          };

          await fetch('https://api-bip.salvador.ba.gov.br/logs/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(logRequestBody),
          });

          // Redirect to the desired page
          router.push("/auth/admin/ips");
        }
      } else {
        setPassword("");
        setUsername("");
        setErrorMessageLogin(true);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false); // Define o estado de carregamento como falso
    }
  };

  return (
    <>
      <div className=" bg-white flex justify-between dark:bg-[#101010]">
        <div className="flex justify-between h-screen w-screen">
          <div className="w-3 mt-10">
            <Image
              className="relative left-32 hidden bg-cover 2xl:block "              
              src={geseg}
              alt=""
              width={1000}
              height={660}
            />
          </div>

          <div className="w-1/2 p-8 mt-20">
            <h1 className="text-4xl text-[#316195] font-bold mt-20 md:mt-20 md:text-7xl">Descrição das atividades</h1>
            <div className="md:mt-2 md:w-3/5">
              <p className="text-lg mt-4 mb-6 md:text-2xl">
                Este projeto{" "}
                tem como objetivo ser uma {" "}
                <span className="font-semibold text-[#316195]">
                  documentação{" "}
                </span> das atividades dos analistas da equipe de segurança da PMS.
              </p>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto border-2">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <Image className="w-40" src={geseg} alt="" />
                </div>
                <p className="mt-3 text-black">
                  Entre para acessar seu painel administrativo
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-black"
                    >
                      Usuário
                    </label>
                    <input
                      type="username"
                      name="username"
                      id="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setErrorMessageLogin(false);
                      }}
                      required
                      placeholder="usuário"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-[#205aa7] rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-black"
                      >
                        Senha
                      </label>
                      <p
                        onClick={handleBotaoClick}
                        className="text-sm text-black focus:text-gray-500 hover:text-gray-500 hover:underline hover:cursor-pointer"
                      >
                        Esqueceu sua senha?
                      </p>
                      {modalAberto && (
                        <section
                          id="password-change-banner"
                          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-60"
                        >
                          <div className="max-w-md shadow-2xl p-4 mx-auto bg-white border-2 border-[#205aa7] rounded-2xl relative">
                            <button
                              className="text-black font-semibold hover:text-[#205aa7]  rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none absolute top-1 right-4"
                              onClick={fecharModal}
                            >
                              X
                            </button>
                            <h2 className="font-semibold text-gray-800">
                              🔒 Esqueceu a sua senha? 🔑
                            </h2>
                            <p className="mt-4 text-sm text-gray-600">
                              Caso tenha esquecido ou perdido sua senha, por favor, entre em contato com o{' '}
                              <span className="text-[#205aa7]">suporte</span> ou o seu{' '}
                              <span className="text-[#205aa7]">gerente</span> designado para obter
                              assistência na recuperação da sua senha.
                            </p>
                            <p className="mt-4 text-sm text-gray-600">
                              Lembre-se de armazenar sua senha de forma segura.
                            </p>
                          </div>
                        </section>
                      )}
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          placeholder="●●●●●●●●"
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-[#205aa7] rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 px-4 py-2 mt-2 text-gray-700  rounded-md dark:bg-gray-800 dark:text-gray-300 "
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                      </div>
                    </div>
                    {errorMessageLogin && (
                      <p className="max-w-xl mt-3 text-red-500">
                        Usuário ou senha inválidos
                      </p>
                    )}

                    <div className="flex items-start mt-3">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-3 focus:ring-primary-300 accent-black"
                          checked={rememberMe}
                          onChange={handleRememberMe}
                        ></input>
                      </div>

                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-black">
                          Lembre-se de mim
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#205aa7] rounded-lg hover:bg-[#4d7bb9] focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                      disabled={loading}
                    >
                      <div className="flex justify-center items-center">
                        {loading ? (
                          <div role="status" title='Entrando' className="itens-center">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <span>Entrar</span>
                        )}
                      </div>
                    </button>
                    <div className="flex justify-center mx-auto">
                      <Image className="w-40 mt-10" src={logoCogel} alt="" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cookies />
    </>
  );
};

export default LoginForm;


