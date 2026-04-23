import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Order Received!</h1>
        <p className="text-slate-500 leading-relaxed">
          Your payment was successful and the AI has already started preparing your package. 
          You will receive a confirmation email shortly.
        </p>
        <Link 
          href="/" 
          className="mt-4 flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Store
        </Link>
      </div>
    </div>
  );
}
