import dayjs from 'dayjs';

const Footer = () => {
  const year = dayjs().year();

  return (
    <footer className="border-t bg-background">
      <div className="flex flex-col h-16 place-items-center justify-center text-sm text-muted-foreground">
        <p>© {year} MyApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
