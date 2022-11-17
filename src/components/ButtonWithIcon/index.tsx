import { Play, PlusCircle, MinusCircle, Info } from 'phosphor-react';

interface IProps {
  template: 'watch' | 'about' | 'addToMyList' | 'removeFromMyList';
}

export function ButtonWithIcon({ template }: IProps) {
  const buttonProps = {
    watch: {
      title: 'Assistir',
      icon: (
        <Play
          size={16}
          weight="fill"
        />
      ),
      bgColor: 'bg-yellow-500',
    },
    about: {
      title: 'Sobre',
      icon: (
        <Info
          size={20}
          weight="fill"
        />
      ),
      bgColor: 'bg-white/30',
    },
    addToMyList: {
      title: 'Minha Lista',
      icon: (
        <PlusCircle
          size={20}
          weight="fill"
        />
      ),
      bgColor: 'bg-white/30',
    },
    removeFromMyList: {
      title: 'Minha Lista',
      icon: (
        <MinusCircle
          size={20}
          weight="fill"
        />
      ),
      bgColor: 'bg-slate-800',
    },
  };

  return (
    <button
      className={`${buttonProps[template].bgColor} text-white p-2 rounded-md flex justify-center items-center gap-2`}
      type="button">
      {buttonProps[template].icon}
      {buttonProps[template].title}
    </button>
  );
}
