// src/components/GraficoLucro.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// O componente espera receber os dados do gráfico via props
type Props = {
  data: {
    name: string;
    Vendas: number;
    Despesas: number;
  }[];
};

function GraficoLucro({ data }: Props) {
  return (
    // O ResponsiveContainer faz o gráfico se adaptar ao tamanho da tela
    <ResponsiveContainer width="95%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        {/* Adiciona as linhas de grade no fundo do gráfico */}
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* Define o que será mostrado no eixo X (horizontal) */}
        <XAxis dataKey="name" />

        {/* Define o que será mostrado no eixo Y (vertical) */}
        <YAxis />

        {/* O Tooltip é a caixinha que aparece quando passamos o mouse sobre as barras */}
        <Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
        
        {/* A Legenda que mostra o que cada cor significa */}
        <Legend />

        {/* Define a primeira barra do gráfico. dataKey="Vendas" diz que ela deve usar o valor da propriedade "Vendas" dos nossos dados. A cor é verde. */}
        <Bar dataKey="Vendas" fill="#82ca9d" />
        
        {/* Define a segunda barra do gráfico. dataKey="Despesas" usa a propriedade "Despesas", com a cor vermelha. */}
        <Bar dataKey="Despesas" fill="#db4437" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraficoLucro;