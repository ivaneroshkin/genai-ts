import { personalisedPitch} from './llmChain/llmChain';
import { personalisedPitchFromLcel } from './llmChain/llmChainLcel';

// await personalisedPitch("Generative AI", "TypeScript Developer", 100);
await personalisedPitchFromLcel("Generative AI", "NodeJs Developer", 100);
