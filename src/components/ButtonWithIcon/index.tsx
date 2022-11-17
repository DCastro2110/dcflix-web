import { Play, PlusCircle, MinusCircle, Info } from 'phosphor-react';

interface IProps {
  template: 'watch' | 'about' | 'addToMyList' | 'removeFromMyList';
}

export function ButtonWithIcon({ template }: IProps) {
  const buttonProps = {
    watch: {
      title: 'Assistir',
      icon: <Play size={16} />,
      bgColor: 'bg-yellow-500',
    },
    about: {
      title: 'Sobre',
      icon: <Info size={16} />,
      bgColor: 'bg-white/30',
    },
    addToMyList: {
      title: 'Minha Lista',
      icon: <PlusCircle size={16} />,
      bgColor: 'bg-white/30',
    },
    removeFromMyList: {
      title: 'Minha Lista',
      icon: <MinusCircle size={16} />,
      bgColor: 'bg-slate-800',
    },
  };

  return (
    <button
      className={`${buttonProps[template].bgColor} p-2 flex justify-center items-center`}
      type="button">
      {buttonProps[template].icon}
      {buttonProps[template].title}
    </button>
  );
}
