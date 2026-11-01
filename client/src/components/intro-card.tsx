import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StackGroup } from "@/types/profile.ts";

type IntroCardProps = {
  name: string;
  role: string;
  stack: StackGroup[];
};

const introCard = tv({
  slots: {
    root: "bg-transparent shadow-none ring-0",
    name:"text-3xl font-semibold tracking-tight text-headline",
    role: "text-lg",
    stackHeading: "text-sm font-medium text-muted-foreground",
    groups: "grid gap-3",
    groupLabel: "text-xs tracking-wide text-muted-foreground uppercase",
    tags: "flex flex-wrap gap-2",
    tag: "rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground",
  },
});
const styles = introCard();

function IntroCard({
  name,
  role,
  stack,
}: Readonly<IntroCardProps>): JSX.Element {
  return (
    <Card className={styles.root()}>
      <CardHeader>
        <CardTitle level={1} className={styles.name()}>
          {name}
        </CardTitle>
        <CardDescription className={styles.role()}>{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className={styles.stackHeading()}>Stack</h2>
        <dl className={styles.groups()}>
          {stack.map((group) => (
            <div key={group.label}>
              <dt className={styles.groupLabel()}>{group.label}</dt>
              <dd>
                <ul className={styles.tags()}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.tag()}>
                      {item}
                    </li>
                  ))}
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
