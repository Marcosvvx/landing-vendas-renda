"use client";

import { useState } from "react";
import { CheckCircle, Star, Shield, Clock, TrendingUp, Zap, Award, Target } from "lucide-react";

type Answer = {
  question: number;
  answer: number;
};

type QuizData = {
  situation: number;
  time: number;
  goal: number;
  experience: number;
  preference: number;
  investment: number;
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const questions = [
    {
      title: "Qual sua situação atual com renda extra?",
      options: [
        "Nunca tentei ganhar renda extra",
        "Já tentei mas não deu certo",
        "Já faço algo mas quero aumentar"
      ]
    },
    {
      title: "Quanto tempo você tem disponível por dia?",
      options: [
        "Menos de 1 hora",
        "1 a 3 horas",
        "Mais de 3 horas"
      ]
    },
    {
      title: "Qual sua meta de ganhos mensais?",
      options: [
        "R$ 500 a R$ 1.500",
        "R$ 1.500 a R$ 3.000",
        "Acima de R$ 3.000"
      ]
    },
    {
      title: "Você tem experiência ou conhecimento prévio?",
      options: [
        "Nenhuma experiência",
        "Conhecimento básico",
        "Já tenho alguma experiência"
      ]
    },
    {
      title: "Qual sua preferência de trabalho?",
      options: [
        "100% online (de casa)",
        "Presencial ou híbrido",
        "Tanto faz, quero resultado"
      ]
    },
    {
      title: "Quanto pode investir no início?",
      options: [
        "Nada ou muito pouco (até R$ 100)",
        "Entre R$ 100 e R$ 500",
        "Acima de R$ 500"
      ]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, { question: currentQuestion, answer: answerIndex }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Gerar recomendação personalizada
      const quizData: QuizData = {
        situation: newAnswers[0].answer,
        time: newAnswers[1].answer,
        goal: newAnswers[2].answer,
        experience: newAnswers[3].answer,
        preference: newAnswers[4].answer,
        investment: newAnswers[5].answer
      };
      
      const personalizedRec = generateRecommendation(quizData);
      setRecommendation(personalizedRec);
      setShowPayment(true);
    }
  };

  const generateRecommendation = (data: QuizData): string => {
    let rec = "";
    
    // Lógica baseada nas respostas
    if (data.time === 0 && data.investment === 0) {
      rec = "Seu perfil é ideal para métodos rápidos e sem investimento inicial. Selecionamos estratégias que você pode começar hoje mesmo, direto do celular, e ver os primeiros resultados em até 7 dias.";
    } else if (data.goal === 2 && data.experience === 2) {
      rec = "Com sua experiência e meta ambiciosa, preparamos um plano avançado com métodos escaláveis. Você terá acesso a estratégias comprovadas que podem gerar R$ 3.000+ por mês com dedicação consistente.";
    } else if (data.preference === 0 && data.time >= 1) {
      rec = "Perfeito! Seu perfil combina com trabalho 100% online. Montamos um pacote com os melhores métodos digitais que se encaixam na sua rotina e podem gerar renda recorrente trabalhando de casa.";
    } else if (data.situation === 0) {
      rec = "Como você está começando do zero, criamos um plano passo a passo, super didático, com métodos validados para iniciantes. Você terá todo o suporte necessário para fazer sua primeira venda ou ganho.";
    } else if (data.investment === 2 && data.goal >= 1) {
      rec = "Com seu capital inicial e meta de ganhos, você tem potencial para resultados acelerados. Selecionamos métodos com ROI comprovado que podem multiplicar seu investimento em semanas.";
    } else {
      rec = "Baseado no seu perfil, criamos um plano equilibrado com métodos práticos e realistas. Você terá acesso a estratégias que já ajudaram milhares de pessoas a conquistar renda extra consistente.";
    }
    
    return rec;
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header com Garantia */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 text-center shadow-lg">
          <p className="text-sm md:text-base font-semibold flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Garantia incondicional de 7 dias • Pagamento 100% seguro
          </p>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Recomendação Personalizada */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 shadow-2xl border-4 border-blue-200">
            <div className="flex items-start gap-4 mb-4">
              <Target className="w-10 h-10 text-white flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Seu Plano Personalizado Está Pronto
                </h2>
                <p className="text-white text-lg md:text-xl leading-relaxed">
                  {recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Oferta Principal */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-100">
            <div className="text-center mb-10">
              <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                OFERTA LIMITADA
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Método Completo de Renda Extra
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Sistema validado com estratégias práticas para você começar a gerar resultados reais
              </p>
              
              <div className="inline-block bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl px-10 py-6 mb-6 shadow-xl">
                <p className="text-white text-sm font-medium mb-2">De R$ 497 por apenas</p>
                <p className="text-6xl font-bold text-white">R$ 127</p>
                <p className="text-white/90 text-sm mt-2">Pagamento único • Acesso vitalício</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-gray-700 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Acesso imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Certificado de conclusão</span>
                </div>
              </div>
            </div>

            {/* O que está incluído */}
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                O que você vai receber:
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  "5 métodos validados e comprovados",
                  "Vídeo-aulas passo a passo completas",
                  "Ferramentas e templates prontos",
                  "Suporte via e-mail prioritário",
                  "Atualizações gratuitas vitalícias",
                  "Bônus: Guia de produtividade"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Principal */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl md:text-2xl font-bold py-6 md:py-7 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.02] mb-4">
              Garantir Acesso Agora por R$ 127
            </button>
            
            <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Pagamento processado com segurança • SSL Certificado
            </p>
          </div>

          {/* Depoimentos */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Resultados de quem já começou
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  name: "Mariana Silva",
                  result: "R$ 1.200 no primeiro mês",
                  text: "Em 7 dias já fiz meus primeiros R$ 300. Nunca imaginei que seria tão rápido e direto!",
                  avatar: "MS"
                },
                {
                  name: "Carlos Eduardo",
                  result: "R$ 2.800 mensais",
                  text: "Nunca tinha ganhado nada fora do meu trabalho, e agora faço renda extra todo mês de forma consistente.",
                  avatar: "CE"
                },
                {
                  name: "Juliana Costa",
                  result: "R$ 850 em 15 dias",
                  text: "Foi o conteúdo mais direto que já comprei. Sem enrolação, só o que realmente funciona.",
                  avatar: "JC"
                },
                {
                  name: "Roberto Alves",
                  result: "R$ 3.500 mensais",
                  text: "Comecei com apenas 2 horas por dia. Hoje já superei minha meta inicial e continuo crescendo!",
                  avatar: "RA"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3 italic leading-relaxed">"{testimonial.text}"</p>
                  <p className="text-blue-700 font-bold flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5" />
                    {testimonial.result}
                  </p>
                </div>
              ))}
            </div>

            {/* Provas Sociais Simuladas */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-5 text-center text-xl">
                Feedback recente de alunos:
              </h4>
              <div className="space-y-3">
                {[
                  "Ana Paula: 'Gente, acabei de receber meu primeiro pagamento! R$ 247 🎉'",
                  "Marcos: 'Comecei ontem e já fiz R$ 89. Isso funciona mesmo!'",
                  "Fernanda: 'Melhor investimento que fiz esse ano. Já recuperei o valor!'",
                  "Pedro: 'Minha esposa não acreditou quando mostrei o resultado 😂'"
                ].map((message, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <p className="text-gray-700">{message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Garantia Final */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
            <Shield className="w-20 h-20 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Garantia Incondicional de 7 Dias
            </h3>
            <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed">
              Se você não ficar satisfeito por QUALQUER motivo, devolvemos 100% do seu dinheiro. 
              Sem perguntas, sem burocracia. Você não tem nada a perder.
            </p>
            <button className="bg-white text-blue-600 font-bold text-xl md:text-2xl py-6 px-12 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl">
              Começar Agora com Segurança Total
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 drop-shadow-2xl">
            Descubra Seu Método de Renda Extra
          </h1>
          <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg leading-relaxed">
            Responda 6 perguntas rápidas e receba um plano personalizado para começar a ganhar dinheiro
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-700">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-bold text-blue-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
              {questions[currentQuestion].title}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500 flex items-center justify-center transition-all flex-shrink-0">
                      <span className="text-gray-400 group-hover:text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-lg font-medium text-gray-700 group-hover:text-blue-700">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold">2 minutos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold">Resultado instantâneo</span>
            </div>
          </div>
        </div>

        {/* Footer Trust */}
        <p className="text-center text-white/90 mt-8 text-sm flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          Suas respostas são privadas e usadas apenas para personalizar sua recomendação
        </p>
      </div>
    </div>
  );
}
