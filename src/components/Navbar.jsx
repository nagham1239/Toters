import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!Cookies.get("userSession");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("userSession");
    navigate("/");
    setMenuOpen(false);
  };

  const getActiveClass = (path) =>
    location.pathname.toLowerCase() === path.toLowerCase() ? "active" : "";

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAX0AAACECAMAAABLTQsGAAAA+VBMVEX///8QuJnuQSMAtpYAtJOj3dDuPiDuPBx41MLuOxoAtJTtLwDP7OXtNxXtNxJx0r7v+fftKgD/+fjZ8Or3/fz/+PX///zm9/TyemrtMwo4wabuRSiC0b7/+fTD6uL6wrBax7AgvaCT3M32moH72NKH2cj70cv96+jybEj+8O394NKp5Nj85NzzgGf5vau15tz4tqz3rJfvTzX2p5zwX0jvTh/xYjz0jXP2oJPxa1DycVr5yL3vUS36wKz7zr3vQxVNybH4sZzxZlL0in33san1lYbyeGjxZUzzdk/4vbX1i2n3oob1k37yd1v0h2/yc1fwXC74qI7zhHdUEgoUAAAXcElEQVR4nO1dC1vazBLekJAQQ0K4G5Q7iCCKUsF6OVxsrbVVW/v/f8zZTYDMbjYJfudDjjXv8/SpQLIs7+7OzM7MThCKECFChAgRIkSIECFChAgRIkSIECHC/xsGtaNtd+HjoiKKYnbbnfioMOuCIFW23YuPipQoCGJj2734oIhj8gUxte1ufEyYhHxBLG27Hx8TKZt9ob7tfnxIVBzyBXHbHfmQmEXsbw/LqS+IxW135eMhV4vY3x6ykhCxvzUkxBX7uW335cPBLAkr9rfdl4+Hyor8yN5/ezRcwRPtdd8cM5f9BPVBpII3j1x9JXh2QHgl26iV4tvr1UdBTnLl/jK6kmzUJVEUZ5EJtGkUXWt/ZtrvJFN1x+U52HLXPgCSLvtt8jqbksRIB78V3J2uhAVPriGslHAUZ9w8VnJfnOEXKXclJEJvjfA/I7fSuUlUdCe+GO283gQLe19MoaJr+kdy540QX8R0c6jmGp9SlFn1Nkg65GfRwCU/EvpvhpqIpXwS5Vy5IyWifdZbISuINcx2hTH8I7wNskky1ZdBFlGM/Dtvj5KjfcVa5NvcAmqiJAr1WjIS+W+B7vXp5y9fvtx9PXBeFweDQSWa9xtAJtPFyNjodvqth7vd4Z5iGLquG4Y8PM1su4N/LfoPn+6+7d6en9/uEnw7HyqaZqiyHFtAlrXb7rZ7+Rci3/p0n05blqGqCoZqQ3F5X0E/j+j/l9H5fCtbymJ6E/Y5tC9hfdp2b/8uXH/TDEWOyYpuadpofIgxHmlpS1d4YyAPt93fvwiZg1tVx6Sq1s3txbzXzS/Q7c+bt0ND9wyAHGttu89/DTq7GpY4iqV9f+gVPJ/2ry+mmsrQbzxsoZ9/IzKfLZ1wfzkv41fl/sHLj8PfWO2qN+MfPw/65JLyf46nNP/G57BmzaQLcwPdLoL23++Or3tlyJj78TXhvvfz6gabl1jhEiiqoU1P7KsKB78syL+6G2bztyUXm/AEpUD77/bg8ENMj8nGuIr/7J6N0garZNXLMt4CECk/Odbcz+RhPrhdE8S9NpFrkhRA+++V/VPMthJ7IeZ74VnjmDf6I+qMtb0nrBAy10Nj9b4WYvGbIOtK2AA7AzC69Xfq8PiMCbfGPfvv/G+FY1tqE3RtxWRVe8IaoHORXg6Qdh3c8tGOy84mMn3iLvvvNbJ2h+ey9dhFmZPhrwyaGxz2pwj9sAW+LjexsKneLIbIuAtuOgXYmW2g6yCi/07PzH/SYrL2ggX+s6Voc9S98Uoe9QmhqfO2bFzi6d8f6c4HV8Ft11x2pE2wA9XKuwzpf8YSZTpB6GCKCZVHfVTVPOwbB2iyele15tj6/GU4ajdwv1V0T7gImzBJYDKv9B7F/oGGbUps65zs2cLEaKL8ISv55WEf3enuS21ewCvFpt8IFPzghIsgbIAdkFDxLg8w9YdKTMPkVxeKVI7hyW+xgucYdc/hkGgXBVR4MkIFP0w3mW1gs7W/YbWyYWSu9JiBBcmJuhT2ePKjMTP5rf+gFq2LjUc8+39hPSzfBDWfAOzsb6D7QKlvZC+3YXwyYtYznvmWGzWZ9olxSQFb9U2deesMq2miiNNBFn8dCIYNKF2oVnaS/377G0bfktVfZTSZAjNHf0aFY8qdox4X0Ig1hIjqPcCCyvoa0D5UihtgB+50hffH/q4e03p4FwsljbzXQ5M0JWbmqMdMfWJ54t1Z04rpf/ybz0L2N9D95IbVymbxoMsGNvR/0dTq2Lg/BJNf3uujz94tmEriiocqsYf80ADmuLCB/sO93PurkHWuKPdldMLa93g5TEA8UTlE+UuO+8G4QOQ6y9/Hn3gtO6ZZPGqnUrVaKpU4KpphLuNXqxXTNOMJp/1GePPMrYNFz9oV7zLL4Y4vGm4fmWu1/KAR/03fs7fVsZw/dteD9YI6Uy/5WOGWEb6Os9014w5mgJ1E3AVfSBSP9uuiRI492sB/zeL88wDFRTuCT/v8n5s7apekVfv4j1rcw1IlTmP5/YNEHfSMzZqsNGaitCPClkM3N5lvKvEgHHtEesw6QD3X7MFG0AvP92ONcSP9qax7rJ7aoqNQKYoueDUkzcpMoG+w7xFKFe88yoW1z1HAuWKtzraPX7M0SiIFyT6Lk4szt4olQG6RfOptORHCf0uX1Qnqef0KMfUQDIpy2EVewSMbWtNxSOuGx+oRgiF62Y/PJJb6xbWSN0O0yL90Bck7YNmaZ2idS1PUOqyxLM7I19Uk5i6x5t7SqO8IPIj14HM8f3TlkrDHm9ZYIMUWAsk4Q709RjjJ+rSJxU4Z/+sZyj0z+ZMh7NTZuVkRfLi3f4bHfZZl2WDBsl9M+bYvUlGHGXOZNEDoyHuvmyxfqfv3RQqKJmWwwjwhkoPDvvqURxeLYcE6+IERPHrsBzZ08if3lz2yMbYYq+comH04c2wk+PPSvYH5GY1g9j3tD+oB7UNTtVhnCczSdtvy7eVyPAruecAW5MGQR1005wgeQnkV9Z0NljxChe9w8yXr2gWmu3B9oykW1s9zi/X18DoMfy9t/hRLYVOZnUXsDA2+GiWC25fc7gzYz+pF/kxaLK79kGkQcILzztAfsda8sdg0EVvY3xcWzgW9ifJwhPTYMZ7w+eq9QXTBtINHST2nW94PYZ8yDpNBE3PFAuWdLr1mqZipsPZd1/eAFfupCu/m5fQJWYOCsONrBnfPFYMkKvRPv2uWN1HKqKKOveGdHqD/uPaPmj4mDv3qL83Rw9YZKl+pe5STH5StCvm165JPC5Ow9qkFn2NVpsc+AWsxwbJf4y6zxfBWYMvYzhTqddtihvf7bcCJi6fs/Fk+eR5bKj0AyhhPfoMsgi5aeX1U63hCZM7har0Qk7Vp0ElVxRB7ECrFpED/PPxpCcOjhaE0qYjB7c8g+TR9kliq7adKzACsVlbdTkzh8M3AtmZyYAmKpfZyyCsp2C0/yf+gydher+6+2MH0/vVTzNApF/6JvQ/D0qk/lBfcf58USEoJkFXEz1C1mKSqo4QNMEXFWsIF7BEtREQhlcwWMbLJFMMuqDuTizvt1MHHKbf5NlxalGTG5n2W6MtilpZGq/1B1k7K4iwtkRpwJz0AiCmpDa3iLPjAz+r8omOJ3tV0Iz1qHtgm4+RurLnZssp5F71Yi2QG8lq7xPMe9Z7odEIsmLpp5YqTVEUJCH4vcpR9Ldbh3oexsr2zCBooos8Kj8PYF9yhJqlRocRzFrS7vLPUINgviTviSgy6IlNiTmu6rldf/8qtol07wVrZmJ5fTPIFkrnfPI8Zy3SFOcpPlWnGTmZQ1PtJHnN/HGN0NHE0T5Uhh324J/JJtYlT5Kfoi3L79KfszVBFlnx8F1AGl6jxa1DiGX7CKlqxnjIXzZvFway+2CHkQIUidn/hFoqdcftFPGzTFvq5MOSxFTm6qNoroDcfa7YSkKcInaWbqKDFFOumigen/6x51LN6TCx+jcN+Bbp/+eTACSh50nFA9TGB46GGqTz8uBlcWiKTywVnOF1T6IgW/FKNvrE4cEaxEXBQuQEruPDQHSo3/dWOyh4AY+/ypEMUcXf+7cZS7Gndz6B+2ro/wez2LxTOtlj+jdB3Jd3xfgP86dwFSMkddvUSULPQkxIB2+f71SgeGckFw2I0+7Se9s3RclWHd0+7mlZ+kqe1p4w76BslR2TFmj7N7RXQf/ieTn9xLm2e4CHpPk69ZmnMWSEXunbg/QagUHe4qTbQYuOWtDIhEWzc1q1R45chagr+d9PsUxxB7gMc44B9ryNK8vvaBVp76lW5fO/JHVGt9OilZSeRT9yr+03N8DlAlMbDw2OfPBBnxT5XLIMLmO3UElDys9IFZojWuf50mPBQYz9Mgm+ntS6lj/2zH92l563MUlylVftYnDb7dJrIagSM0X2zBy8+u+F5mAH71qnnC6h9I499eIFPjQfKZGHYh6k8XI7g1Pd6XKBUozgaUGLf108J1o53aHPZJXzCLK094wvis09EENbCzVVyeCfNFToOtB5h3xtaD8tvpfZBPoW0swHsp4JmNkEi8AJqowEXXht2yz8xl5Jcr64PEsg+geJKk8L8ds/yu9Jh3zv3EyFKkWLWr/sB7MMMUd76pujxyDWokGl/AJR2UkCkvkaZrK/MkgxhH5ugTXAwotA7PUxzvEFE8mS4ch+ai9z8Vrjd5IRbHPizT1mMvN8emEZHZThSYw81fWB6HLVdFoX2q/IkW3v6t0Lh1od9ffTo2pD5VsuxQ59vWG9QzJb7TyqHfSg+OT2jdsK+us2ffSi3S7xfDrx3bMQ9R7vAqVBYFnIaFJ1qU23g/fAsuf4AdIb6rzK64nmXY7pFgieo+tOJWZ2kp99e7ABK//q7bBjUiBGL85Bj70NzkufmroTrXBTIfkhBMmgSMVuFAePDoBqGApFviHEudNqRSmsvgMxQv+wiTlhR1qfP2OApV8fp9DVCEzvTTTW0m88HZAUUqpQ3KEZcdSPZ8Ox1w5QinH6+ud8Vf/bDjk1QU9N926w0RNp/KtIrpxGmzHk9cAegPlhvAG71MS9XQVeOewXM8SWe4tMWmmuPi7xC2ZqeN4mvB+UPgDeIuJg1jp8HKkWe2K+DTnMlBwE8d8SwD27nxk8psdxImhiVRqrGOpc97rv1D8OwoRjnHrHUWCep7o/OOSihpp/IHuv6iQRP1KcyulTxECwPTmA79ObR9gYVep/HpGJJjKRx9jR1l2099NhEgDXjgnKFUVxQgoVjrtKOSnGx9+FEYVmLAI5qyDROsbLHwY6wxiGarxZWlV0qWVmZ2sGTyaVhqwMnmUH9jgpPK/VAvEHfr/vkKHvn5QprYeuABHY91TKgUcFzcFIyxXeOUdYfZbbCVcHLUUzymfFwLzDrpgg/DMlIM/0inOIsVPy0NOMFlcExFTX9mxzX7T0vgyfpHjq1nLxCeHxXVrXp8Ym9Avon308KJEDsSSaESpHnKqHEvm/mBRQfdKCiHWIXDtZiX/JYYwPYblg+oCn4fIvoyZlh0T0nOVOr7FjF+kVkTutwFTyRR8R7SQ7GlVntTLxBv896TmCye68OPSYPdEDyBAvFq18XKfFBXwWPTfAGLyTtwbmx7t0Fwh16+HGMXNsvByzQWCX4YijYnnG4VowbolD7z6AOg/FzkcxAUqvYs0REC49ufxJvUGuq3nsahz8ydK/l10M6Kwt+Qu21eD80lHpRrDc48gHu0Nc5A1nxqnHnZr7jz8WpYUxQgcRsFWuMBQjqXVDBE2Lx2KSTNXLBc+0rBjksfWZZ3loZUClybADKd+yb9UIp3Rn8BI4L1yoPnPok0TXFd0qDUV2zovegxlPm3HgFRFcnWVA/Ndk4d4InMYphkszw7KwE9Rr1vZtce308InTjyWULP0voH9uAgFTQYh+6EWq8W+n9FJjQ2Nqv12oDH6sQhiJLayaY53KJGkcBhNUtuNVHXdR9+n1WJvXA2OAJSWZY5JarhwV0wfUxG9eoZ6jemDpUijxyKcnhF8Cgk2UpPQatct7tlMlTSpXsRBvMe73WHlQCNGIyzG3tg8qg7smBCVk61waJHRL0m4YneIItnoeltF9kl3igXCKskA2vgzPsLCFVWsSPfTrwTc1EcDs3blZZx4HKwauPe7gw23ReWMhOGXVv9XtiuJdfhpaHWnmUR6v0TeWybKdWscBivz+VFU+VGEqw8ObAOuzTAQDKlwPrznC9wJD91zwUIGyHHohie82wmIOvGsklLBz7lIRB7kYYX9f1XkUynZ91js7NQqXIW+gU+z4hDCpRj953UqmtPPFMsf+KskAlv29cD1QWbhj7GUU9zKPyJc/RiTUtOLKu/C6gM8/kx/uwXkzhnJqDZwlrPHbWmfs1X4sn3BW23lba26066Nc/KWwADelQvfHV0OakSICXfHnYRY/ABsLXdYbM5CcGz5PKmfrhySRrsE+dxWWSFlJhe6J/KPfhTpc7a8KQfY3Wzt/qNz3uyS1SmQGe4lXGXWzYU5col11UxeKIk0gFphBfrlC7WL69T+3HaOuPyiHkyhVou7xCfcKdrt+KMRttBzyJar7KZrpOk8O5nRtPiEurohbl/8TmUZc65iJjuYMHiHtUHVDLr8oD1TJ/r0vZjIwGpBIE+VKdsjjXliGzsDWFSJk/J6F2p87bRYZY2gzuDFIXqRdjz2XhncAPakXI0zI6AZJfVqvkmLXu8S0jeifKT6Si/TycWUT5D1l/FxVW4pvVUC3vrKt2qQQtv13BqmM8tWyGOBcZdIdqbIIwrzT9pDIDI+aNM1QGssjCgzbHcoeTQkiZJD6mAzynwFvklJeMNVrhmREfb2Id3L72w69zITt0Gy77nLkP9uBr1aU4MJRp30M/tjAnjDSSRx33VLtsNfE9U5lfixamJvtUpKIO3XjWMJ1Z7smvrYUZtHQell9NskqcuRcGDXxHzGWfs6phz9aSd6eaOsb0VzXKhd/xVmYwmqi7CAfIKiZ/osgWvzQS5bzn/3Iq5YG1GotU2MKbD0KNDV+s0O5RjnLIJWeixPhi1trprvrGiSuAmNK6uv6PpWODBp2o7mRXxijPVkiKyTd48ttmj5w+w+TvKYZPJVrKReDTC5pg6qI4vWX3rp5SiNhCjBOVWJ2M/XhUI34ZZmpA/4ivl8a9yDumoGPr7vEyXyx1hO3O3nilZrGB0+eUxltUrVJvsKaoxhT93qcMMJ0us1ygZrIBAs50TFosLZ7dYmaPmJNcHLVKjdxKvprJNrBTmPOEopBIOkmVuWLWLUpABQ8p/4iv1AbGGDNEFXiQa+Z3P4v8lWET2jleuHtIYUJeZQatj6411TokgsqQjVuexrV/Oc1sqjEYDNr7NUECcy3HnNiSSqn9xH4CiwOae550ZQJXqbjd/kwSwYTLeXIXxHptP5HYr9VBSgm1cuD+zj+VB6ZbCbXBaviO6JNm6z/uM7NrKemfdpFTm38SS+RluenPqHx2OC+gwoWGyfctwcyclhZFpzKIQB0f9kRevQcRBR9znjmBK0qr9mvuRXG2Ke43QMmfXM9cpDwgzjlR4sDeoRbka1x0mTs8lcmp/04zpsvkEK6nMoMj+Ul9AIT6v6yYtes3830yXZxe+XPIg8ifQr4hc0p9sxUvuP2B/gQYlAgo4bdGwF56ZQXAT5aiWiTM0mtOtXTXTmZgoViHdjbb2VSVtS9Bpd/9uwXEqRl6TlryWf/+NUqg/VkMP4ctUakfUGcGeeZCh1VqvNZH1BrqsnFTzZNsWTzDf7CuH9mY3pO8zvLk3JDVoTegAuF7hJ7yeBWDT/yLYtsvK8y3FAElqMKOwYt1Wj6sW9fWN4+H3+xa6PxJK4p1WXVeTbS0Zejk+QeKqhqWlv7dbJEUnuqTpsjaub/UCe4fPafMgPIqWA37Ky6/EjEibecFlW/B1zInVOEJyuASftkSvySP0+zsn1U8PrjVZEUbndn++sJk/vnP0+V4fPn0fDef2M9h6Z+ONFU2huEPW8nywvx4d8M6e+Osebm8VKwF2ssD3n14wFjXWMqvfam+z05vsD0O9ZDt+1SGwdz/41rc3a9DQ8Hy53jedZ56Uy53u92y/XcmT9L3ZdnYuwuZ+DaSJU8dBaHEye8tpjz1wERiGxZDJGdS8LY/4zzvMVvj1APjdwWGbEJDAkVuHbP6jFMwb33kT881XSGZas+n172+nb/f7fcmp49jzcIfaMPP63BPMEgJixJ05L9Sw69OnBlPLC908g6w+b5G87mjGrbylu0Ls4Zf6rZ51KiLbk8kodQ44l6679ZkC8tHICjG23UJdhy3+z8/didzvTskj1NUrWlsODzHGA73VEsn7wyvXvVgS9McNBKpVDueDCmRaOIdbjuVSjXiFdNce/LkTPMoniLtZ0PbNytx+wsaAZdWUiusGYvE7Q7sdtuk4//SE486D7uxtIZ1Lnm8ov2YRd2w0sbu1+jRZm+E/sPdnys872MxPP+v/tydritwIvxLyHc6/Var3+mEPNUpQoQIESJEiBDh/wz/BQg6DQyYw8X9AAAAAElFTkSuQmCC" alt="Toters Logo" className="logo-img" />
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className={getActiveClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" className={getActiveClass("/products")} onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/about" className={getActiveClass("/about")} onClick={() => setMenuOpen(false)}>About Us</Link>

        {isLoggedIn && (
          <>
            <Link to="/cart" className={getActiveClass("/cart")} onClick={() => setMenuOpen(false)}>
              <FaShoppingCart /> Cart
            </Link>
            <Link to="/order-tracking" className={getActiveClass("/order-tracking")} onClick={() => setMenuOpen(false)}>
              Track Order
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" className={getActiveClass("/login")} onClick={() => setMenuOpen(false)}>
              <FaUser /> Login
            </Link>
            <Link to="/signup" className={getActiveClass("/signup")} onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
