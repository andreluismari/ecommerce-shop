import { supabase } from "@/lib/supabase";

export function Teste() {
  async function testar() {
    const { data, error } = await supabase.from("customers").select("*");

    if (error) {
      alert("Erro: " + error.message);
      return;
    }

    console.log(data);
    alert("Conexão funcionando!");
  }

  return (
    <div>
      <h1>Teste Supabase</h1>
      <button onClick={testar} className="bg-black text-white p-2 rounded">
        Testar Conexão
      </button>
    </div>
  );
}
