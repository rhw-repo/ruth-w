import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { icons, type IconId } from "@/components/icons/icon-registry";

type IntroCardProps = {
  name: string;
  role: string;
};

type StackGroup = {
  id: string;
  label: string;
  items: IconId[];
};

const stackGroups: StackGroup[] = [
  { id: "frontend", label: "Frontend", items: ["react", "typescript"] },
  {
    id: "full-stack",
    label: "Full stack",
    items: ["node", "express", "mongodb"],
  },
  { id: "tools", label: "Tools", items: ["claude-code", "docker"] },
];

const introCard = tv({
  slots: {
    root: "bg-transparent shadow-none ring-0",
    header: "px-0",
    content: "px-0",
    name: "text-3xl font-semibold tracking-tight text-headline sm:text-4xl lg:text-4xl",
    role: "text-lg",
    groups: "grid gap-3",
    stackGroup: "grid gap-3",
    groupLabel: "text-xl mt-8 mb-2 tracking-wide text-headline uppercase",
    tags: "flex flex-wrap gap-8",
    tag: "flex flex-col items-center gap-2 text-sm",
    label: "text-muted-foreground",
    icon: "size-8",
  },
});
const styles = introCard();

function IntroCard({ name, role }: Readonly<IntroCardProps>): JSX.Element {
  return (
    <Card className={styles.root()}>
      <CardHeader className={styles.header()}>
        <CardTitle level={1} className={styles.name()}>
          {name}
        </CardTitle>
        <CardDescription className={styles.role()}>{role}</CardDescription>
      </CardHeader>
      <CardContent className={styles.content()}>
        <dl className={styles.groups()}>
          {stackGroups.map((group) => (
            <div key={group.id} className={styles.stackGroup()}>
              <dt className={styles.groupLabel()}>{group.label}</dt>
              <dd>
                <ul className={styles.tags()}>
                  {group.items.map((id) => {
                    const { label, Icon } = icons[id];
                    return (
                      <li key={id} className={styles.tag()}>
                        <Icon className={styles.icon()} />
                        <span className={styles.label()}>{label}</span>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default IntroCard;
