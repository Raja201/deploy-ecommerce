import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          style: { background: "#E9F7EF", color: "#1B4332" }, // Success green
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
          style: { background: "#FDE2E4", color: "#D72638" }, // Error red
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-[#FAF9F6] shadow-md rounded-lg border border-gray-300">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#333333]">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            className="font-medium text-[#023047] hover:text-[#03557D] focus:outline-none focus:ring-2 focus:ring-[#FFB703] focus:ring-offset-2"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        className="space-y-4"
      />
      <div className="text-sm text-center text-gray-600">
        By signing in, you agree to our{" "}
        <Link
          className="text-[#023047] hover:text-[#03557D] focus:outline-none focus:ring-2 focus:ring-[#FFB703] focus:ring-offset-2"
          to="/terms"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          className="text-[#023047] hover:text-[#03557D] focus:outline-none focus:ring-2 focus:ring-[#FFB703] focus:ring-offset-2"
          to="/privacy"
        >
          Privacy Policy
        </Link>.
      </div>
    </div>
  );
}

export default AuthLogin;
