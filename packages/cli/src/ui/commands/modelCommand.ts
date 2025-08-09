/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { SlashCommand } from './types.js';
import { MessageType } from '../types.js';
import {
  DEFAULT_GEMINI_MODEL,
  DEFAULT_GEMINI_FLASH_MODEL,
  DEFAULT_GEMINI_FLASH_LITE_MODEL,
} from '@google/gemini-cli-core';

export const modelCommand: SlashCommand = {
  name: 'model',
  description: 'Switch between available Gemini models. Usage: /model [model_name]',
  action: async (context, args) => {
    const config = context.services.config;
    const addItem = context.ui.addItem;

    const availableModels = [
      DEFAULT_GEMINI_MODEL,
      DEFAULT_GEMINI_FLASH_MODEL,
      DEFAULT_GEMINI_FLASH_LITE_MODEL,
    ];

    if (!args) {
      // No arguments provided, list current model and available models
      const currentModel = config.getModel();
      addItem(
        {
          type: MessageType.INFO,
          text: `Current model: ${currentModel}\nAvailable models: ${availableModels.join(', ')}`,
        },
        Date.now(),
      );
      return { type: 'handled' };
    }

    const newModel = args.trim();
    if (!availableModels.includes(newModel)) {
      addItem(
        {
          type: MessageType.ERROR,
          text: `Invalid model: "${newModel}". Available models: ${availableModels.join(', ')}`,
        },
        Date.now(),
      );
      return { type: 'handled' };
    }

    config.setModel(newModel);
    addItem(
      {
        type: MessageType.INFO,
        text: `Model switched to: ${newModel}`,
      },
      Date.now(),
    );
    return { type: 'handled' };
  },
};
