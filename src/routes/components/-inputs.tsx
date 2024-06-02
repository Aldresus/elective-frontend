import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxWithText } from "@/components/ui/checkboxWithText";
import { Input } from "@/components/ui/input";
import { InputWithText } from "@/components/ui/inputWithText";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { TextareaWithText } from "@/components/ui/textAreaWithText";
import { Textarea } from "@/components/ui/textarea";

export default function InputsExample() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="text-accent">Les inputs</div>
      <div>
        <div className="flex flex-col gap-6">
          <div>
            <Input id="text" type="text" placeholder="Text input" />
          </div>
          <div>
            <InputWithText
              label="Text input avec description"
              description="Description"
            />
          </div>
          <div>
            <Label htmlFor="disabled">Disabled input</Label>
            <Input
              id="disabled"
              type="text"
              placeholder="Disabled input"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="number">Number input</Label>
            <Input id="number" type="number" placeholder="Number input" />
          </div>
          <div>
            <Label htmlFor="file">File input</Label>
            <Input id="file" type="file" placeholder="File input" />
          </div>

          <CheckboxWithText label="Checkbox sans description" />
          <CheckboxWithText
            label="Checkbox avec description"
            description="Description"
          />

          <div>
            <Label htmlFor="switch">Switch</Label>
            <Switch id="switch" />
          </div>
          <div>
            <Label htmlFor="radio">Radio</Label>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="textarea">Textarea</Label>
            <Textarea id="textarea" placeholder="Textarea" />
          </div>
          <div>
            <TextareaWithText
              label="Textarea avec description"
              description="Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
